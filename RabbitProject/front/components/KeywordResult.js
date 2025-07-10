import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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

  return (<h3 className="mbti-color-title" style={{ color }}>{mbti}</h3>);
};

const KeywordResult = () => {
  return (
    <>
      <div className="container">
        <div className="section-one">
          <p style={{color: 'white', fontSize: '30px', wordSpacing: '-4px'}}>당신이 선택한 MBTI는...</p>
          <div className="mbti-box">
              <MbtiColorText className="title" mbti="INTP" />
              <p style={{color: 'white', fontSize: '32px', wordSpacing: '-4px', margin: '-20px 0 15px 0'}}>논리술사형</p>
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
            <p style={{ fontSize: '13px', color: '#fff', textAlign: 'center' }}>새 키워드를 입력해서 영화를 추천받을 수 있어요.<br/>분위기, 현재 나의 감정, 좋아하는 것을 입력하면 AI가 다시 추천 목록을 제공합니다.            
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
            <Button className="button-confirm-white" type="text">결과 다시 보기</Button>
          </Link>
          <Link href="/" legacyBehavior>
            <Button className="button-confirm-white" type="text">처음으로</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default KeywordResult;
