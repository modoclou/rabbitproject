import React from 'react';

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
      <div className="app">
        <h1 className="menu-title">AI 추천 기록</h1>
        <div className="card-container">
          <div className="card">
            <div className="middle" style={{justifyContent: 'space-between', gap: '40px' }}>
              <div className="type">
                <MbtiColorText mbti="INTP" />
                <h2 className="card-title">논리술사형</h2>
              </div>
              <div className="movie-list">{renderPosters()}</div>
            </div>
            <p className="more-link">+N개의 결과 더보기</p>
          </div>
          <div className="card">
            <div className="middle" style={{ justifyContent: 'space-between', gap: '40px' }}>
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