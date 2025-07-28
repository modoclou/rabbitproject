package com.company.project001.util;

import java.util.Date;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    private static final long ACCESS_EXPIRATION = 60 * 60 * 1000L; // 1시간
    private static final long REFRESH_EXPIRATION = 7 * 24 * 60 * 60 * 1000L; // 7일

    // ✅ 기존 방식 유지 (type 없이 생성)
    public String createToken(String username, long expireTimeMs) {
        Claims claims = Jwts.claims();
        claims.put("username", username);

        Date now = new Date();
        Date expiry = new Date(now.getTime() + expireTimeMs);
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ AccessToken 생성
    public String createAccessToken(String username) {
        return createTokenWithType(username, ACCESS_EXPIRATION, "access");
    }

    // ✅ RefreshToken 생성
    public String createRefreshToken(String username) {
        return createTokenWithType(username, REFRESH_EXPIRATION, "refresh");
    }

    // ✅ 내부용 확장형 생성 (type 포함)
    private String createTokenWithType(String username, long expireTimeMs, String type) {
        Claims claims = Jwts.claims();
        claims.put("username", username);
        claims.put("type", type);

        Date now = new Date();
        Date expiry = new Date(now.getTime() + expireTimeMs);
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ username 꺼내기
    public String getLoginId(String token) {
        return extractClaims(token).get("username").toString();
    }

    // ✅ type 꺼내기 (존재할 경우에만)
    public String getTokenType(String token) {
        Claims claims = extractClaims(token);
        Object type = claims.get("type");
        return type != null ? type.toString() : "unknown";
    }

    // ✅ 만료 여부 확인
    public boolean isExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // ✅ 유효한 토큰인지 전체 검증
    public boolean validate(String token) {
        try {
            extractClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // ✅ Claims 추출
    private Claims extractClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
