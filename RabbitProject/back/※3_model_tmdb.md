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
✅ 1. 회원가입 요청 테스트: /movies/signup
▶ Method: POST ▶ URL: http://localhost:8080/movies/signup ▶ Body (raw / JSON):

json
{
  "username": "test001",
  "password": "1234",
  "nickname": "테스터",
  "age": 25,
  "mbti": "INTP"
}
✅ 2. 로그인 요청 테스트: /movies/login
▶ Method: POST ▶ URL: http://localhost:8080/movies/login ▶ Body (raw / JSON):

json
{
  "username": "test001",
  "password": "1234"
}
📌 주의: 로그인 성공 시, 응답 헤더에 Set-Cookie: jwt=... 가 포함됩니다. 이 쿠키를 다음 요청에 수동으로 넣거나, Postman에서 자동 처리되게 해야 합니다.

Postman에선 “Cookies” 버튼 클릭 > jwt 쿠키 확인

또는 이후 요청 헤더에 수동으로 추가:

Cookie: jwt=발급받은_JWT_값
✅ 3. 영화 저장 테스트: /movies/save
▶ Method: POST ▶ URL: http://localhost:8080/movies/save ▶ Header (필수):

http
Cookie: jwt=발급받은_JWT_값
▶ Body (raw / JSON):

json
{
  "title": "인셉션",
  "overview": "꿈 속의 꿈 속의 꿈...",
  "posterPath": "/poster/inception.jpg"
}
✅ 4. 영화 목록 조회: /movies/mine
▶ Method: GET ▶ URL: http://localhost:8080/movies/mine ▶ Header:

http
Cookie: jwt=발급받은_JWT_값
✅ 로그인된 사용자 ID로 영화가 연동돼 있다면 목록이 나옵니다.

✅ 5. 비밀번호 재설정 (찾기): /movies/reset-password
▶ Method: POST ▶ URL: http://localhost:8080/movies/reset-password ▶ Body (raw / JSON):

json
{
  "username": "test001",
  "mbti": "INTP",
  "age": 25
}
✅ 6. 비밀번호 변경: /movies/change-password
▶ Method: PATCH ▶ URL: http://localhost:8080/movies/change-password ▶ Body (raw / JSON):

json
{
  "username": "test001",
  "newPassword": "4321",
  "confirmPassword": "4321"
}


✅ 7.  MBTI 기반 AI 영화 추천 테스트
▶ Method:	GET ▶ URL	http://localhost:8080/movies/mbti-ai/INTP