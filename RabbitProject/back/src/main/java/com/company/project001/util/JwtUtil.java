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
	
	//jwt token 발급
	public String  createToken( String username, long  expireTimeMs  ) {
		Claims  claims = Jwts.claims();
		claims.put("username", username);
		Date now = new Date();
		Date expiry = new Date(now.getTime() + expireTimeMs);
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		
		return Jwts.builder()
					.setClaims(claims)
					.setIssuedAt(now)
					.setExpiration(expiry)
					.signWith(key , SignatureAlgorithm.HS256)   // 32자의 비밀키
					.compact();
	}
	
	//Claims 에 username 꺼내기
    public String getLoginId(String token) {
        return extractClaims(token).get("username").toString();
    } 
	//토큰만료여부
    public boolean isExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }     
	
	//내부 Claims 추출
    private Claims extractClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
