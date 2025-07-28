package com.company.project001.domain;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Member {
	private Long id; 
	private String username;
	private String password;
	private String email;
	private String nickname;
	private String image;
	private LocalDateTime udate = LocalDateTime.now();
	private MemberRole role; // ROLE_ADMI, ROLE_SYSTEM, ROLE_MEMBER
	private String provider; // thejoa, kakao, naver, google 
	
	
	@Builder
	public Member(String username, String email, String nickname, 
				String image, MemberRole role, String provider , String password) {
		super();
		this.username = username;
		this.email = email;
		this.nickname = nickname;
		this.image = image;
		this.role = role;
		this.provider = provider;
		this.password = password;
	} 
	
	//private List<Board> board; //연관 된 게시글 목록 ( mybatis에서 직접 매핑 ) 
	
	
}
/*
id	bigint	NO	PRI		auto_increment
email	varchar(255)	YES			
password	varchar(255)	YES			
provider	varchar(255)	YES			
role	varchar(255)	NO			
udate	datetime(6)	YES			
username	varchar(255)	YES	UNI		
nickname	varchar(255)	YES			
img	varchar(255)	YES			
image	varchar(255)	YES		
*/	