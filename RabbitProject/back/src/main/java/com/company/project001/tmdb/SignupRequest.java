package com.company.project001.tmdb;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String email;
    private String age;
    private String password;
    private String mbti;
}