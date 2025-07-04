package com.company.project001.tmdb;
 
import com.company.project001.domain.Movie;
import com.company.project001.domain.User;
import com.company.project001.tmdb.UserMovieService;
import com.company.project001.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // ✅ 문자열 true로 변경
@RequiredArgsConstructor
public class MovieController {

    @Value("${tmdb.api.key}")
    private String rawApiKey;

    @Value("${openai.api.key}")
    private String openAiApiKey;

    private final JwtUtil jwtUtil;
    private final UserMovieService userMovieService;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        userMovieService.register(user);
        return ResponseEntity.ok(Map.of("message", "회원가입 성공"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");
        User user = userMovieService.login(username, password);

        if (user != null) {
            String token = jwtUtil.createToken(username, 60 * 60 * 1000L);
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, "jwt=" + token + "; HttpOnly; Path=/; SameSite=Lax")
                    .body(Map.of("message", "로그인 성공", "nickname", user.getNickname()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "로그인 실패"));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, Object> resetInfo) {
        String username = (String) resetInfo.get("username");
        String mbti = (String) resetInfo.get("mbti");
        int age = (int) resetInfo.get("age");

        User user = userMovieService.verifyUserInfoForReset(username, mbti, age);
        if (user != null) {
            String tempPassword = "Temp" + System.currentTimeMillis() % 10000;
            userMovieService.updatePassword(username, tempPassword);
            return ResponseEntity.ok(Map.of("tempPassword", tempPassword));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "일치하는 정보가 없습니다."));
        }
    }

    @PatchMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String newPassword = payload.get("newPassword");
        String confirmPassword = payload.get("confirmPassword");

        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body(Map.of("error", "비밀번호 불일치"));
        }

        userMovieService.updatePassword(username, newPassword);
        return ResponseEntity.ok(Map.of("message", "비밀번호 변경 완료"));
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveMovie(@RequestBody Movie movie,
                                       @CookieValue(value = "jwt", required = false) String token) {
        if (token == null || jwtUtil.isExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "로그인 필요"));
        }

        String username = jwtUtil.getLoginId(token);
        User user = userMovieService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "사용자 없음"));
        }

        movie.setUserid(user.getId());
        userMovieService.saveMovie(movie);
        return ResponseEntity.ok(Map.of("message", "영화 저장 완료"));
    }

    @GetMapping("/mine")
    public ResponseEntity<?> getMyMovies(@CookieValue(value = "jwt", required = false) String token) {
        if (token == null || jwtUtil.isExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "로그인 필요"));
        }

        String username = jwtUtil.getLoginId(token);
        User user = userMovieService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "사용자 없음"));
        }

        List<Movie> movies = userMovieService.getMoviesByUserId(user.getId());
        return ResponseEntity.ok(movies);
    }
    
    @GetMapping("/mbti-ai/{type}")
    public ResponseEntity<?> getAiRecommendedMovies(
            @PathVariable("type") String type,
            @CookieValue(value = "jwt", required = false) String token) {

        // ✅ 로그인 사용자 ID 추출 (없으면 null)
        Long userId = null;
        if (token != null && !jwtUtil.isExpired(token)) {
            String username = jwtUtil.getLoginId(token);
            User user = userMovieService.findByUsername(username);
            if (user != null) {
                userId = user.getId();
            }
        }

        String prompt = String.format(
                "MBTI가 %s인 사람에게 어울리는 인기 영화 5편을 영어 제목으로 알려줘. 줄바꿈(\\n)으로 구분하고 번호 없이 제목만 알려줘.",
                type.toUpperCase());

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(openAiApiKey.trim());

            Map<String, Object> requestBody = Map.of(
                    "model", "gpt-3.5-turbo",
                    "messages", List.of(Map.of("role", "user", "content", prompt))
            );

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            String gptUrl = "https://api.openai.com/v1/chat/completions";

            ResponseEntity<Map> response = restTemplate.postForEntity(gptUrl, request, Map.class);
            Map<String, Object> gptBody = response.getBody();

            List<String> titles = Optional.ofNullable(gptBody)
                    .map(body -> (List<?>) body.get("choices"))
                    .map(choices -> ((Map<?, ?>) choices.get(0)).get("message"))
                    .map(message -> ((Map<?, ?>) message).get("content").toString())
                    .map(content -> Arrays.stream(content.split("\\n"))
                            .map(s -> s.replaceAll("^[0-9]+[.)]\\s*", "").trim())
                            .filter(s -> !s.isEmpty())
                            .collect(Collectors.toList()))
                    .orElse(List.of("GPT 추천 실패"));

            List<Map<String, Object>> movieDetails = new ArrayList<>();
            for (String title : titles) {
                try {
                    String query = URLEncoder.encode(title, StandardCharsets.UTF_8);
                    String tmdbUrl = "https://api.themoviedb.org/3/search/movie"
                            + "?api_key=" + rawApiKey.trim()
                            + "&query=" + query
                            + "&language=ko-KR";

                    Map<String, Object> tmdbResult = restTemplate.getForObject(tmdbUrl, Map.class);
                    List<?> results = (List<?>) tmdbResult.get("results");

                    if (results != null && !results.isEmpty()) {
                        Map<?, ?> match = (Map<?, ?>) results.get(0);

                        Movie movie = new Movie();
                        movie.setTitle((String) match.get("title"));
                        movie.setOriginalTitle((String) match.get("original_title"));
                        movie.setOverview((String) match.get("overview"));
                        String posterPath = (String) match.get("poster_path");
                        String posterUrl = (posterPath != null)
                                ? "https://image.tmdb.org/t/p/w500" + posterPath
                                : "/images/default.png";

                        movie.setPosterPath(posterPath);

                        Object release = match.get("release_date");
                        if (release instanceof String && !((String) release).isBlank()) {
                            movie.setReleaseDate(LocalDate.parse((String) release));
                        }

                        Object adult = match.get("adult");
                        if (adult instanceof Boolean) {
                            movie.setAdult((Boolean) adult);
                        }

                        // ✅ 로그인 사용자에 한해 DB 저장 수행
                        if (userId != null) {
                            movie.setUserid(userId);
                            userMovieService.saveMovie(movie);
                        }

                        movieDetails.add(Map.of(
                                "title", movie.getTitle(),
                                "originalTitle", movie.getOriginalTitle(),
                                "overview", movie.getOverview(),
                                "poster", posterUrl,
                                "releaseDate", movie.getReleaseDate(),
                                "adult", movie.getAdult()
                        ));
                    }
                } catch (Exception ignore) {
                    movieDetails.add(Map.of("title", title, "error", "TMDB 검색 실패"));
                }
            }

            return ResponseEntity.ok(Map.of(
                    "mbti", type.toUpperCase(),
                    "recommended_movies", movieDetails,
                    "source", "ChatGPT + TMDB"
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "AI 추천 중 오류 발생", "details", e.getMessage()));
        }
    }


}
