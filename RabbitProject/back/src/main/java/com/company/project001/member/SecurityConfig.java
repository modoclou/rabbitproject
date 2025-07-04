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

    private final MemberService memberService;          // 반드시 JwtUserService 구현 필요
    private final UserMovieService userMovieService;    // 반드시 JwtUserService 구현 필요

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // 💡 JwtUserService 인터페이스 구현을 강제하지 않았다면 ClassCastException 발생함
        JwtUserService memberJwtUserService = (JwtUserService) memberService;
        JwtUserService movieJwtUserService = (JwtUserService) userMovieService;

        JwtTokenFilter memberJwtFilter = new JwtTokenFilter(memberJwtUserService, jwtUtil);
        JwtTokenFilter movieJwtFilter = new JwtTokenFilter(movieJwtUserService, jwtUtil);

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
                .antMatchers("/member/login", "/member/join", "/resorces/**").permitAll()
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

        // 두 개의 필터 모두 등록
        http.addFilterBefore(memberJwtFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(movieJwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
