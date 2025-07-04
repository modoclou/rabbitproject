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

    @JsonFormat(pattern = "yyyy-MM-dd") // JSON → LocalDate 매핑
    private LocalDate releaseDate;
}
