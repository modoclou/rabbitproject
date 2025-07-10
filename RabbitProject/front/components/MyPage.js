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

const MyPage = () => {

  return (
    <>
    </>
  );
};

export default MyPage;