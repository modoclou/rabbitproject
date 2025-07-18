package com.company.project001.member;

import com.company.project001.oauth.PrincipalOauth2UserService;
import com.company.project001.tmdb.UserMovieService;
import com.company.project001.util.JwtTokenFilter;
import com.company.project001.util.JwtUserService;
import com.company.project001.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final PrincipalOauth2UserService principalOauth2UserService;
    private final JwtUtil jwtUtil;

    private final MemberService memberService;          // JwtUserService 구현체 - jwt
    private final UserMovieService userMovieService;    // JwtUserService 구현체 - jwt + refresh

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // 🔐 각 도메인에 맞는 JWT 사용자 서비스 생성
        JwtUserService memberJwtUserService = (JwtUserService) memberService;
        JwtUserService movieJwtUserService = (JwtUserService) userMovieService;

        // ✅ 각 경로별 전용 필터 구성
        JwtTokenFilter memberJwtFilter = new JwtTokenFilter(memberJwtUserService, jwtUtil, "/api/member/");
        JwtTokenFilter movieJwtFilter = new JwtTokenFilter(movieJwtUserService, jwtUtil, "/movies/");

        http
            .csrf().disable()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            .and()
            .authorizeRequests()
                .antMatchers(
                    "/api/member/login", "/api/member/join",
                    "/movies/login", "/movies/signup", "/movies/reset-password", "/movies/change-password"
                ).permitAll()
                .antMatchers("/member/login", "/member/join", "/resources/**").permitAll()
                .antMatchers("/board/**", "/member/member").authenticated()
                .anyRequest().permitAll()
            .and()
            .formLogin()
                .loginPage("/member/login")
                .loginProcessingUrl("/member/login")
                .defaultSuccessUrl("/member/member", true)
                .failureUrl("/member/login?error=true")
            .and()
            .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/member/logout"))
                .logoutSuccessUrl("/member/login")
                .invalidateHttpSession(true)
            .and()
            .oauth2Login()
                .loginPage("/member/login")
                .defaultSuccessUrl("/member/member")
                .userInfoEndpoint()
                .userService(principalOauth2UserService)
            .and()
            .and()
            .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> {
                    String uri = request.getRequestURI();
                    if (!uri.startsWith("/api/") && !uri.startsWith("/movies/")) {
                        response.sendRedirect("/member/login?error=true");
                    } else {
                        response.setStatus(401);
                        response.setContentType("application/json");
                        response.getWriter().write("{\"error\":\"Unauthorized\"}");
                    }
                })
                .accessDeniedHandler((request, response, authException) -> {
                    String uri = request.getRequestURI();
                    if (!uri.startsWith("/api/") && !uri.startsWith("/movies/")) {
                        response.sendRedirect("/member/login?error=true");
                    } else {
                        response.setStatus(403);
                        response.setContentType("application/json");
                        response.getWriter().write("{\"error\":\"Unauthorized\"}");
                    }
                });

        // ✅ 각 필터를 등록할 때는 경로가 겹쳐도 상관없음 (내부에서 분기하므로)
        http.addFilterBefore(memberJwtFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(movieJwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
