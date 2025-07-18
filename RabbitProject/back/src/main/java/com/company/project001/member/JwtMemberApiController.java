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

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
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
            return ResponseEntity.badRequest()
                                 .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("error", "회원가입 중 오류가 발생했습니다."));
        }
    }

    // ✅ 2. 로그인 (기존 JWT 방식 유지)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginForm form, HttpServletResponse response) {
        Member member = memberService.findByUsername(form.getUsername());
        if (member == null || !passwordEncoder.matches(form.getPassword(), member.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Map.of("error", "아이디 또는 비밀번호가 틀렸습니다."));
        }

        String token = jwtUtil.createToken(member.getUsername(), 60 * 60 * 1000L); // 1시간 유지

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(60 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(Map.of(
            "message", "로그인 성공",
            "nickname", member.getNickname()
        ));
    }

    // ✅ 3. 마이페이지 (쿠키로 인증)
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

    // ✅ 4. 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie expiredCookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, expiredCookie.toString());

        return ResponseEntity.ok(Map.of("message", "로그아웃 되었습니다."));
    }
}
