-------------------------------------------------------------------------------------- 
User 
--------------------------------------------------------------------------------------
id nickname age    username	 	password   mbti    createdAt	
1 first 	    20     first@gmail.com	1111   	   ENTP 2025.06.27



-------------------------------------------------------------------------------------- 
Movie
-------------------------------------------------------------------------------------- 
아이디     유저(fk)    성인여부   배경포스터       제목    원본제목        시놉시스      상영일자
id             userid      adult        poster_path    title    original_title    overview      release_date



CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    mbti VARCHAR(10),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movie (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    userid BIGINT NOT NULL,
    adult BOOLEAN DEFAULT FALSE,
    poster_path VARCHAR(255),
    title VARCHAR(255),
    original_title VARCHAR(255),
    overview TEXT,
    release_date DATE,
    FOREIGN KEY (userid) REFERENCES user(id) ON DELETE CASCADE
);


>>>>>>>>>>>>>>>>>>>>>>>>>
 

✅  API 테스트 개요
- Base URL  : http://localhost:8080/movies
🎯 필수 헤더  :  Content-Type: application/json
🎯쿠키 필요 시 : Cookie: jwt=발급받은토큰; refresh=리프레시토큰

- 주의사항:
🎯로그인/회원가입 외 요청은 대부분 JWT 쿠키 필요
Postman에서 Cookies 탭 또는 Headers 직접 설정

📌 API 목록 요약
HTTP	엔드포인트	설명	쿠키 필요
POST	/signup	회원가입	❌
POST	/login	로그인 & 쿠키 반환	❌
POST	/reset-password	비밀번호 초기화	❌
PATCH	/change-password	비밀번호 변경	❌
POST	/save	영화 저장	✅
GET	/mine	내가 저장한 영화	✅
GET	/mbti-ai/{type}	MBTI 기반 AI 추천	⚠️ JWT 있을 경우 DB 저장
POST	/logout	로그아웃 (쿠키 제거)	
 
✅ 회원가입
POST /movies/signup
Body:
{
  "username": "cozizii-_-@naver.com",
  "password": "1111",
  "nickname": "테스터",
  "age": 25,
  "mbti": "INTP"
}
✅ 로그인 후 쿠키 확인
POST /movies/login
Body:
{
  "username": "cozizii-_-@naver.com",
  "password": "1111" 
}

 
이후 요청 Header:
Cookie: jwt={{jwt}}

✅ 비밀번호 재설정
http://localhost:8080/movies/reset-password
POST /movies/reset-password
{
  "username": "cozizii-_-@naver.com",
  "mbti": "INTP",
  "nickname": "테스터"
}

{
    "tempPassword": "Temp3267"
}
✅ 비밀번호 변경
PATCH /movies/change-password
{
  "username": "testuser",
  "newPassword": "newpass123",
  "confirmPassword": "newpass123"
}
 
✅  저장된 영화 조회  - 쿠키필요
GET /movies/mine
Header: Cookie: jwt=...

✅   MBTI 기반 추천 (ChatGPT + TMDB)
GET /movies/mbti-ai/infp
(옵션) Header: Cookie: jwt=...
결과로 추천 영화 5개 + TMDB 검색 결과 포함

로그인 상태일 경우 DB에 저장됨

✅   로그아웃
POST /movies/logout
쿠키가 즉시 만료됨 (Set-Cookie: jwt=; Max-Age=0)

응답:

json
{
  "message": "로그아웃 완료"
}