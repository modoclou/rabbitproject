import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Orbit&family=Paprika&display=swap');

  body {
    background-color: #1d1d1d;
    margin: 0;
    font-family: 'Orbit', sans-serif;
    color: white;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
  }

  .section {
    margin-bottom: 40px;
    text-align: center;
  }

  .mbti-box {
    background: linear-gradient(
      to bottom,
      rgba(34, 34, 34, 1) 0%,
      rgba(34, 34, 34, 0.4) 80%,
      rgba(28, 28, 28, 0) 100%
    );
    border-radius: 10px;
    padding: 30px 50px;
    max-width: 800px;
  }

  .title {
    font-family: 'Paprika', cursive;
    font-size: 54px;
    color: #BA62B9;
    margin: 0 auto;
    display: block;
  }

  .poster-boxes {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  .poster-placeholder {
    width: 148.84px;
    height: 238px;
    background-color: #EDEDED;
    border-radius: 5px;
  }

  .desc-box {
    background: linear-gradient(
      to bottom,
      rgba(34, 34, 34, 1) 0%,
      rgba(28, 28, 28, 0) 100%
    );
    border-radius: 10px;
    padding: 30px;
    max-width: 800px;
    color: white;
    font-size: 14px;
    line-height: 1.6;
    font-family: 'Orbit', sans-serif;
  }

  .movie-title {
    color: #ffffff;
    font-size: 24px;
    word-spacing: -4px;
    letter-spacing: -0.05em;
    text-shadow: 0 0 5pxrgb(255, 255, 255);
    margin: 0 auto;
  }

  .search-box {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .keyword-input {
    width: 300px;
    border-radius: 25px;
    padding: 8px 16px;
    font-family: 'Inter', sans-serif;
    box-shadow: none !important;
    border: 1px solid #FFFFFF !important;
    font-size: 13px;
  }

  .sns-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  .sns-button {
    background-color: #A021EA;
    color: white;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  }

  .back-button {
    margin-top: 40px;
    border: 1px solid white;
    background: transparent;
    color: #ccc;
    border-radius: 25px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    padding: 15px 40px;
  }

  .important{
    color: #D374C9;
    text-shadow: 0 0 5px #D374C9;
  }

  .resultIs{
    font-size: 24px;
    color:rgb(255, 255, 255);
  }

  .middle{
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.small{
  color: white;
  font-size: 11px;
  margin: 0 auto;
  font-family: 'Orbit', system-ui;
}

.description{
  font-size: 13px;
  word-spacing: -4px;
  margin-bottom: 25px;
  font-family: 'Orbit', system-ui;
}

.ant-input-affix-wrapper keyword-input{
  box-shadow: none !important;
  border: 1px solid #FFFFFF;
}

.ant-input-affix-wrapper keyword-input:hover,
.ant-input-affix-wrapper keyword-input:focus,
.ant-input-affix-wrapper keyword-input-focused {
  box-shadow: none !important;
  border: 1px solid #ffffff !important;
}
`;

const MBTIResult = () => {
  const router = useRouter();
  const { mbti } = router.query;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mbti) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/movies/mbti-ai/${mbti}`);
        setMovies(response.data);
      } catch (error) {
        console.error('영화 추천 API 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [mbti]);

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <div className="section">
          <p style={{ fontSize: '30px', wordSpacing: '-4px' }}>당신이 선택한 MBTI는...</p>
          <div className="mbti-box">
            <h3 className="title">{mbti}</h3>
            {/* MBTI 설명은 정적 또는 별도 API로 관리 가능 */}
            <p style={{ fontSize: '32px', wordSpacing: '-4px', margin: '-25px 0 15px 0' }}>논리술사형</p>
            <p style={{ marginTop: '10px', fontSize: '12px', lineHeight: '1.5', color: '#fff' }}>
              논리적 분석과 지적 탐구에 열정을 가진 사색가입니다. 독창적인 아이디어에 몰두하며 복잡한 시스템을 이해하고 개선하려는 성향이 강합니다. 대체로 내향적이지만 토론에는 적극적입니다. <br />
              <span className="important">복잡한 개념과 아이디어가 얽힌 작품을 즐기기 때문에, 철학적 SF나 퍼즐형 미스터리 영화와 잘 맞습니다.</span>
            </p>
          </div>
        </div>

        <div className="section">
          <h3 className="resultIs">AI가 디렉팅한 나의 MBTI 맞춤 영화는</h3>
          <div className="poster-boxes">
            {loading ? (
              <p>로딩 중...</p>
            ) : movies.length > 0 ? (
              movies.map((movie, index) => (
                <div key={index} className="poster-placeholder">
                  {/* 실제 포스터 이미지가 있다면 <img src={movie.posterUrl} /> */}
                </div>
              ))
            ) : (
              <p>추천 결과가 없습니다.</p>
            )}
          </div>
        </div>

        {movies[0] && (
          <div className="desc-box">
            <h2 className="movie-title">{movies[0].title}</h2>
            <p className="small">{movies[0].originalTitle}</p>
            <p className="small" style={{ marginBottom: '10px' }}>
              {movies[0].genre} · {movies[0].country} · {movies[0].duration}
            </p>
            <p className="description">{movies[0].description}</p>
            <p style={{ fontSize: '24px', color: '#fff', wordSpacing: '-4px', marginBottom: '7px' }}>
              추천받은 영화가 마음에 들지 않는다면?
            </p>
            <p style={{ fontSize: '13px', color: '#fff' }}>
              키워드를 입력해서 영화를 추천받을 수 있어요.<br />
              분위기, 현재 나의 감정, 좋아하는 것을 적으면 AI가 다시 추천 목록을 제공합니다.
            </p>
            <div>
            ${movie} ${movies}
            </div>
            <div className="search-box">
              <Input
                className="keyword-input"
                placeholder="키워드 입력"
                suffix={<SearchOutlined style={{ color: '#aaa' }} />}
              />
              <div className="sns-buttons">
                <button className="sns-button"></button>
                <button className="sns-button"></button>
                <button className="sns-button"></button>
                <button className="sns-button"></button>
                <button className="sns-button"></button>
              </div>
            </div>
          </div>
        )}

        <Button className="back-button" onClick={() => router.push('/')}>처음으로</Button>
      </div>
    </>
  );
};

export default MBTIResult;