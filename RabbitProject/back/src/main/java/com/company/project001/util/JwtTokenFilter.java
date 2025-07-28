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
import java.util.Arrays;

public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtUserService userService;
    private final JwtUtil jwtUtil;
    private final String filterPathPrefix; // ✅ 필터가 적용될 경로 접두어

    public JwtTokenFilter(JwtUserService userService, JwtUtil jwtUtil, String filterPathPrefix) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.filterPathPrefix = filterPathPrefix;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String uri = request.getRequestURI();

        // ✅ 이 필터가 적용돼야 할 경로인지 확인
        if (!uri.startsWith(filterPathPrefix)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 1️⃣ JWT 추출 (헤더 또는 쿠키)
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

        // 2️⃣ 토큰 없으면 통과
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.substring(7);

        // 3️⃣ 만료 여부 체크
        if (jwtUtil.isExpired(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
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
                        Arrays.asList(new SimpleGrantedAuthority(user.getRole().name()))
                );

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}
