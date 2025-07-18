package com.company.project001.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class Movie {
    private Long id;
    private Long userid;
    private Boolean adult;
    private String posterPath;
    private String title;
    private String originalTitle;
    private String overview;
    
    private String genres;       // 💡 장르 목록 (예: "액션, 드라마")
    private String countries;    // 💡 국가 목록 (예: "미국, 영국")
    private Integer runtime;     // 💡 러닝타임 (분)

    @JsonFormat(pattern = "yyyy-MM-dd") // JSON → LocalDate 매핑
    private LocalDate releaseDate;
}
