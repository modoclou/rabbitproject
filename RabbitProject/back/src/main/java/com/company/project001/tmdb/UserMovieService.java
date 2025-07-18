package com.company.project001.tmdb;

import com.company.project001.domain.Movie;
import com.company.project001.domain.User;
import com.company.project001.util.JwtUserService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserMovieService implements JwtUserService { // ✅ 인터페이스 구현


    private final UserMovieMapper mapper;

    // ✅ JwtTokenFilter에서 사용됨
    @Override
    public User findUserByUsername(String username) {
        return mapper.findByUsername(username); // 이미 User 객체를 반환하고 있음
    }

    // 🔐 기능1: 회원가입
    public void register(User user) {
        mapper.insertUser(user);
    }

    // 🔑 기능2: 로그인
    public User login(String username, String password) {
        Map<String, String> params = new HashMap<>();
        params.put("username", username);
        params.put("password", password);
        return mapper.login(params);
    }

    // 🔎 기능3: 비밀번호 찾기 검증
    public User verifyUserInfoForReset(String username, String mbti, String nickname) {
        Map<String, Object> params = new HashMap<>();
        params.put("username", username);
        params.put("mbti", mbti);
        params.put("nickname", nickname); 
        
        return mapper.verifyUserInfoForReset(params);
    }

    // 🛠 기능4: 비밀번호 변경
    public void updatePassword(String username, String newPassword) {
        Map<String, String> params = new HashMap<>();
        params.put("username", username);
        params.put("newPassword", newPassword);
        mapper.updatePassword(params);
    }

    // ✳️ findByUsername: 일반 서비스 내부용
    public User findByUsername(String username) {
        return mapper.findByUsername(username);
    }

    // 🎬 기능5-1: 영화 저장
    public void saveMovie(Movie movie) {
        mapper.insertMovie(movie);
    }

    // 🎬 기능5-2: 영화 목록 가져오기
    public List<Movie> getMoviesByUserId(Long userId) {
        return mapper.findMoviesByUserId(userId);
    }
    
    // 🔄 기능 7 MBTI 변경
    public void updateMbti(String username, String newMbti) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("username", username);
        paramMap.put("newMbti", newMbti);
        mapper.updateMbti(paramMap);
    }
 // 🔄 기능 8 사용자 정보 조회 + 나이 계산 통합
    public Map<String, Object> getUserWithAge(String username) {
        return mapper.findByUsernameWithAge(username);
    }
}
