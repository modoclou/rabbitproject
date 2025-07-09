import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .menu-title {}
    margin-top: 80px;
    font-size: 36px;
    color: #ffffff;
    letter-spacing: -1px;
    display: flex;
    justify-content: center !important;
    align-items: center !important;
    font-family: 'Orbit', system-ui;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    display: flex;
    gap: 15px;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .card {
    background: linear-gradient(
      to bottom,
      rgba(34, 34, 34, 1) 0%,
      rgba(28, 28, 28, 0) 100%
    );
    width: fit-content;
    max-width: 905px;
    height: auto;
    padding: 20px 40px;
    background: linear-gradient(...);
    border-radius: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card-title {
    font-size: 20px;
    color: #ffffff;
    white-space: normal;
    font-family: 'Orbit', system-ui;
  }

  .mbti-color {
    font-size: 36px;
    color: #ffffff;
    margin: 0 auto;
    font-family: 'Paprika', cursive;
    margin-bottom: -10px;
  }
  
  .middle{
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .movie-list {
    display: flex;
    gap: 10px;
  }

  .movie-poster {
    width: 130.23px;
    height: 189px;
    background-color: #EDEDED;
    border-radius: 5px;
  }

  .more-link {
  display: flex;
  flex-basis: 100%;
  justify-content: center;
  text-align: center;
  margin-top: 12px;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Orbit', system-ui;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;
}

  .type{
    max-width: 90px;
  }
`;

const colorMap = {
  NT: '#BA62B9',
  NF: '#DDC143',
  ST: '#58A3A1',
  SF: '#6B8D4B',
  default: '#ffffff',
};

const MbtiColorText = ({ mbti }) => {
  let color = colorMap.default;
  if (mbti.includes('NT')) color = colorMap.NT;
  else if (mbti.includes('NF')) color = colorMap.NF;
  else if (mbti.includes('ST')) color = colorMap.ST;
  else if (mbti.includes('SF')) color = colorMap.SF;

  return (<h3 className="mbti-color" style={{ color }}>{mbti}</h3>);
};

const History = () => {
  const renderPosters = () =>
    Array.from({ length: 5 }).map((_, idx) => (
      <div key={idx} className="movie-poster" />
    ));

  return (
    <>
      <GlobalStyle />
      <div className="app">
        <h1 className="menu-title">AI 추천 기록</h1>
        <div className="card-container">
          <div className="card">
            <div className="middle" style={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
              <div className="type">
                <MbtiColorText mbti="INTP" />
                <h2 className="card-title">논리술사형</h2>
              </div>
              <div className="movie-list">{renderPosters()}</div>
            </div>
            <p className="more-link">+N개의 결과 더보기</p>
          </div>
          <div className="card">
            <div className="middle" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
              <div class="type">
                <MbtiColorText mbti="ENFP" />
                <h2 className="card-title">재기발랄한 행동가형</h2>
              </div>
              <div className="movie-list">{renderPosters()}</div>
              </div>
            <p className="more-link">+N개의 결과 더보기</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;