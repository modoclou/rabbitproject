package com.company.project001.util;

import com.company.project001.domain.User;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays; // ✅ import 추가
import java.util.List;

public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtUserService userService;
    private final JwtUtil jwtUtil;

    public JwtTokenFilter(JwtUserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String uri = request.getRequestURI();

        // ✅ 필터 적용 대상 경로만 처리
        boolean isProtected = uri.startsWith("/api/") || uri.startsWith("/movies/");
        if (!isProtected) {
            filterChain.doFilter(request, response);
            return;
        }

        // 1️⃣ 요청 헤더 또는 쿠키에서 JWT 추출
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorizationHeader == null && request.getCookies() != null) {
            Cookie tokenCookie = Arrays.stream(request.getCookies())
                    .filter(c -> c.getName().equals("jwt") || c.getName().equals("jwtToken"))
                    .findFirst()
                    .orElse(null);

            if (tokenCookie != null) {
                authorizationHeader = "Bearer " + tokenCookie.getValue();
            }
        }

        // 2️⃣ Bearer 토큰이 없으면 다음 필터로
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.substring(7);

        // 3️⃣ 만료 여부 검사
        if (jwtUtil.isExpired(token)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 4️⃣ 사용자 인증
        String username = jwtUtil.getLoginId(token);
        User user = userService.findUserByUsername(username);
        if (user == null) {
            filterChain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        null,
                        Arrays.asList(new SimpleGrantedAuthority(user.getRole().name())) // ✅ 수정된 부분
                );

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}
