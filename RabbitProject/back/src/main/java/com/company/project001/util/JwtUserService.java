package com.company.project001.util;

import com.company.project001.domain.User;

/**
 * JWT 필터에서 사용자 인증 정보 조회를 위한 공통 인터페이스입니다.
 * MemberService / UserMovieService 등이 이 인터페이스를 구현합니다.
 */
public interface JwtUserService {
    
    /**
     * username 기준으로 인증용 사용자 정보를 조회합니다.
     * 주로 JwtTokenFilter에서 호출됩니다.
     * 
     * @param username 사용자 아이디
     * @return 사용자 인증 정보 (User 도메인)
     */
    User findUserByUsername(String username);
}
