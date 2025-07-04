package com.company.project001.member;

 

import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.company.project001.domain.Member;
import com.company.project001.util.JwtUtil;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")  // 쿠키 허용
@RestController
@RequestMapping("/api/member")
public class JwtMemberApiController {

    @Autowired private MemberService memberService;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private PasswordEncoder passwordEncoder;

    // ✅ 1. 회원가입
    @PostMapping("/join")
    public ResponseEntity<?> join(@Valid @RequestBody MemberJoinForm form) {
        if (!form.getPassword().equals(form.getPassword2())) {
            return ResponseEntity.badRequest().body(Map.of("error", "비밀번호가 일치하지 않습니다."));
        }

        try {
            Member member = new Member();
            member.setUsername(form.getUsername());
            member.setPassword(form.getPassword());
            member.setNickname(form.getUsername());
            member.setEmail(form.getEmail());

            memberService.insert(member);

            return ResponseEntity.status(HttpStatus.CREATED)
                                 .body(Map.of("message", "회원가입 성공"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("error", "회원가입 중 오류가 발생했습니다."));
        }
    }

    // ✅ 2. 로그인 (토큰 -> HTTPOnly 쿠키에 저장)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginForm form, HttpServletResponse response) {
        Member member = memberService.findByUsername(form.getUsername());
        if (member == null || !passwordEncoder.matches(form.getPassword(), member.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Map.of("error", "아이디 또는 비밀번호가 틀렸습니다."));
        }

        String token = jwtUtil.createToken(member.getUsername(), 60 * 60 * 1000); // 1시간

        // ✅ 쿠키 세팅 (HttpOnly + Secure + SameSite)
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false) // 개발 중: http 환경이면 false, 운영에서는 true
                .sameSite("Lax")
                .path("/")
                .maxAge(60 * 60)
                .build();
        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok().body(Map.of(
            "message", "로그인 성공",
            "nickname", member.getNickname()
        ));
    }

    // ✅ 3. 마이페이지 - 쿠키 기반 인증
    @GetMapping("/me")
    public ResponseEntity<?> myPage(@CookieValue(value = "jwt", required = false) String token) {
        if (token == null || jwtUtil.isExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Map.of("error", "로그인이 필요합니다."));
        }

        String username = jwtUtil.getLoginId(token);
        Member member = memberService.findByUsername(username);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Map.of("error", "사용자 정보를 찾을 수 없습니다."));
        }

        return ResponseEntity.ok(Map.of(
            "username", member.getUsername(),
            "nickname", member.getNickname(),
            "email", member.getEmail(),
            "role", member.getRole().name()
        ));
    }

    // ✅ 4. 로그아웃 (쿠키 삭제)
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(0) // 즉시 만료
                .build();
        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(Map.of("message", "로그아웃 되었습니다."));
    }
}


/*
@GetMapping("/me")
public ResponseEntity<?> myPage(@RequestHeader("Authorization") String authHeader) {
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "토큰이 유효하지 않습니다."));
    }

    String token = authHeader.substring(7);

    if (jwtUtil.isExpired(token)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "토큰이 만료되었습니다."));
    }

    String username = jwtUtil.getLoginId(token);
    Member member = memberService.findByUsername(username);
    if (member == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "사용자 정보를 찾을 수 없습니다."));
    }

    // ✅ 사용자의 MBTI 정보가 없으면 기본값 사용 (예: ENTP)
    String mbti = member.getMbti() != null ? member.getMbti() : "ENTP";

    // ✅ AI 영화 추천 호출
    String prompt = String.format(
        "MBTI가 %s인 사람에게 어울리는 인기 영화 5편을 영어 제목으로 알려줘. 줄바꿈(\\n)으로 구분하고 번호 없이 제목만 알려줘.",
        mbti.toUpperCase(Locale.ROOT)
    );

    try {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiApiKey.trim());

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", List.of(Map.of("role", "user", "content", prompt)));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        String gptUrl = "https://api.openai.com/v1/chat/completions";

        ResponseEntity<Map> response = restTemplate.postForEntity(gptUrl, request, Map.class);
        Map<String, Object> gptBody = response.getBody();

        Map<String, Object> choice = (Map<String, Object>) ((List<?>) gptBody.get("choices")).get(0);
        Map<String, String> message = (Map<String, String>) choice.get("message");

        List<String> movieTitles = Arrays.stream(message.get("content").split("\\n"))
                .map(String::trim)
                .map(t -> t.replaceAll("^[0-9]+[.)]\\s*", "")) // "1. 영화제목" 제거
                .filter(t -> !t.isEmpty())
                .collect(Collectors.toList());

        List<Map<String, Object>> movieDetails = new ArrayList<>();
        for (String title : movieTitles) {
            try {
                String query = URLEncoder.encode(title, StandardCharsets.UTF_8);
                String tmdbUrl = "https://api.themoviedb.org/3/search/movie"
                        + "?api_key=" + rawApiKey.trim()
                        + "&query=" + query
                        + "&language=ko-KR";

                Map<String, Object> tmdbResponse = restTemplate.getForObject(tmdbUrl, Map.class);
                List<?> results = (List<?>) tmdbResponse.get("results");

                if (results != null && !results.isEmpty()) {
                    Map<String, Object> firstMatch = (Map<String, Object>) results.get(0);
                    Map<String, Object> movie = new LinkedHashMap<>();
                    movie.put("title", firstMatch.get("title"));
                    movie.put("overview", firstMatch.get("overview"));
                    movie.put("poster", firstMatch.get("poster_path") != null
                            ? "https://image.tmdb.org/t/p/w500" + firstMatch.get("poster_path") : null);
                    movieDetails.add(movie);
                }
            } catch (Exception ignore) {
                movieDetails.add(Map.of("title", title, "error", "TMDB 검색 실패"));
            }
        }

        // ✅ 사용자 정보 + 영화 추천 포함 응답 반환
        return ResponseEntity.ok(Map.of(
                "username", member.getUsername(),
                "nickname", member.getNickname(),
                "email", member.getEmail(),
                "role", member.getRole().name(),
                "recommended_movies", movieDetails
        ));

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "추천 처리 중 오류 발생", "details", e.getMessage()));
    }
}

*/ 
