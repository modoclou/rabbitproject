import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { createGlobalStyle } from 'styled-components';

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

  .section-one {
    margin-bottom: 35px;
    text-align: center;
  }

  .section-two {
    margin-bottom: 50px;
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
    margin: 0 auto;
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
    text-align: center;
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
    height: 40px;
    font-size: 13px;
    min-width: auto;
    width: 400px;
    border-radius: 25px;
    padding: 0 20px !important;
    font-family: 'Inter', sans-serif;
    box-shadow: none !important;
    border: 1px solid #FFFFFF !important;
  }

  .sns-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  .sns-button {
    background-color:rgb(185, 35, 235);
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
    
.confirm {
  max-height: 40px;
  max-width: 120px;
  font-size: 12px;
  padding: 15px 40px;
  border: 1px solid #FFFFFF;
  border-radius: 25px;
  color: black;
  background: #ffffff;
  font-family: 'Inter', system-ui;
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm:hover,
.confirm:focus,
.confirm:active {
  color: white;
  border: 1px solid #FFFFFF;
  background: transparent;
}

.ant-btn-text {
  color: black;
  font-size: 12px;
  padding: 15px 40px;
  border: 1px solid #FFFFFF;
  border-radius: 25px;
  font-family: 'Inter', system-ui;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  line-height: 1;
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
  margin: 0 auto;
  font-size: 11px;
  text-align: center;
  font-family: 'Orbit', system-ui;
}

.description{
  font-size: 13px;
  text-align: center;
  word-spacing: -4px;
  margin-bottom: 25px;
  font-family: 'Orbit', system-ui;
}

.shine{
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
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

const KeywordResult = () => {
  return (
    <>
      <GlobalStyle />
      <div className="container">
        <div className="section-one">
          <p style={{fontSize: '30px', wordSpacing: '-4px'}}>당신이 선택한 MBTI는...</p>
          <div className="mbti-box">
              <h3 className="title">INTP</h3>
              <p style={{fontSize: '32px', wordSpacing: '-4px', margin: '-25px 0 15px 0'}}>논리술사형</p>
            <p style={{ marginTop: '10px', fontSize: '12px', lineHeight: '1.5', color: '#fff' }}>
              논리적 분석과 지적 탐구에 열정을 가진 사색가입니다. 독창적인 아이디어에 몰두하며 복잡한 시스템을 이해하고 개선하려는 성향이 강합니다. 대체로 내향적이지만 토론에는 적극적입니다. <br />
              <span className="important">복잡한 개념과 아이디어가 얽힌 작품을 즐기기 때문에, 철학적 SF나 퍼즐형 미스터리 영화와 잘 맞습니다.</span>
            </p>
          </div>
        </div>
        <div className="section-two">
          <h3 className="resultIs">AI가 디렉팅한 나의 MBTI 맞춤 영화는</h3>
          <div className="poster-boxes">
            <div className="poster-placeholder" />
            <div className="poster-placeholder" />
            <div className="poster-placeholder" />
            <div className="poster-placeholder" />
            <div className="poster-placeholder" />
          </div>
        </div>
        <div className="desc-box">
          <div className="shine">
            <h2 className="movie-title">릴리 슈슈의 모든 것</h2>
            <p className="small">リリイ・シュシュのすべて</p>
            <p className="small" style={{marginBottom: '10px'}}>드라마 · 일본 · 2시간 15분</p>
            <p className="description">
              '릴리 슈슈'의 노래를 너무나 사랑하는 열네 살 소년 유이치. 그러나 그의 일상은 힘들다. 둘도 없는 단짝 친구 호시노가 어느날 반 아이들의 리더가 되어 자신을 이지메 시키고 첫사랑 쿠노 역시 이지메를 당하지만 그녀를 도와주기에는 자신의 슬픔을 감당하기에도 벅차다. 소년의 유일한 안식처는 오로지 영혼을 뒤흔드는 듯한 ‘릴리 슈슈’의 노래 뿐... 그러나 현실은 노래로 감출 만큼 만만하지 않다.  가상의 가수 '릴리 슈슈'를 좋아하는 팬 클럽의 운영자 유이치. 현실에서는 따돌림을 당하고 금품 갈취를 당하거나 폭력을 당하는 것이 일상이다. 그 반동으로 릴리 슈슈의 팬 클럽 운영에 더 적극적이게 되지만...
            </p>
            <p style={{ fontSize: '24px', color: '#fff', wordSpacing: '-4px', marginBottom: '7px', textAlign: 'center' }}>
              추천받은 영화가 마음에 들지 않는다면?
            </p>
            <p style={{ fontSize: '13px', color: '#fff', textAlign: 'center' }}>키워드를 입력해서 영화를 추천받을 수 있어요.<br/>분위기, 현재 나의 감정, 좋아하는 것을 적으면 AI가 다시 추천 목록을 제공합니다.            
            </p>
          </div>
          <div className="search-box">
            <Input
              className="keyword-input"
              placeholder="키워드 입력"
              suffix={<SearchOutlined style={{ color: '#aaa' }} />}
            />
            <div className="sns-buttons">
              <button className="sns-button">
                <Image src="/images/kakao.png" alt="KakaoTalk" className="middle" width={30} height={30} />
              </button>
              <button className="sns-button">
                <Image src="/images/facebook.png" alt="KakaoTalk" className="middle" width={30} height={30} />
              </button>
              <button className="sns-button">
                <Image src="/images/instagram.png" alt="KakaoTalk" className="middle" width={30} height={30} />
              </button>
              <button className="sns-button">
                <Image src="/images/X.png" alt="KakaoTalk" className="middle" width={27} height={27} />
              </button>
              <button className="sns-button">
                <Image src="/images/link.png" alt="KakaoTalk" className="middle" width={30} height={30} />
              </button>
            </div>
          </div>
        </div>
        <div className="middle" style={{gap: '20px'}}>
          <Link href="/" legacyBehavior>
            <Button className="confirm" type="text">결과 다시 보기</Button>
          </Link>
          <Link href="/" legacyBehavior>
            <Button className="confirm" type="text">처음으로</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default KeywordResult;
