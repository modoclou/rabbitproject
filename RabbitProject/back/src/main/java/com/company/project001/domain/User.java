package com.company.project001.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String nickname;
    private LocalDate birthdate;       // ✅ 생년월일로 교체
    private String username;
    private String password;
    private String mbti;
    private LocalDateTime createdAt;
	private MemberRole role; 
}
