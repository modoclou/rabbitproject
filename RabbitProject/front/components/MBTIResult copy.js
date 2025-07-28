import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/router'; // 💡 추가

const colorMap = {
  NT: '#BA62B9',
  NF: '#DDC143',
  ST: '#58A3A1',
  SF: '#6B8D4B',
  default: '#ffffff',
};

const mbtiDescriptions = {
  ISTJ: {
    title: '소금형',
    desc: `책임감이 강고 신뢰할 수 있으며 전통과 질서를 중시합니다. 계획적이고 꼼꼼한 성격으로 체계적인 환경에서 빛을 발합니다. 혼자 일하는 것을 선호하며 실용적인 목표를 추구합니다.`,
    lastSentence: `계획적이고 체계적인 사고방식을 지녀 역사적 사실 기반의 드라마나 치밀한 추리물이 잘 어울립니다.`,
  },
  ISFJ: {
    title: '권위 수호자형',
    desc: `헌신적이고 조화를 중시하는 성격으로, 타인의 필요를 민감하게 인식합니다. 책임감 있고 성실하며 배려심이 깊어 대체로 봉사적인 역할에 잘 어울립니다.`,
    lastSentence: `조용하지만 내면의 의지가 단단합니다. 섬세한 감정을 소중히 여기기 때문에, 감동적인 가족 이야기나 힐링 무드의 작품과 궁합이 좋습니다.`,
  },
  INFJ: {
    title: '예언자형',
    desc: `깊이 있는 통찰력과 강한 직관을 가진 이상주의자로, 인류와 사회의 발전을 위해 의미 있는 일을 하고자 합니다. 혼자만의 시간이 필요하지만, 진심으로 사람을 돕고자 하는 따뜻함이 있습니다. 창의적이고 복잡한 아이디어를 다루는 데 능합니다.`,
    lastSentence: `철학적이고 상징적인 의미를 탐구하는 성향이 강하기 때문에, 내러티브가 깊은 심리극이나 예술영화를 선호합니다.`,
  },
  INTJ: {
    title: '전략가형',
    desc: `독립적이고 분석적인 사고를 바탕으로 미래를 계획하는 데 능합니다. 장기적인 목표를 설정하고 체계적으로 추진하는 전략가적 기질이 있습니다. 감정보다는 논리와 효율성을 중시하며, 자기계발에 열정적입니다.`,
    lastSentence: `복잡한 세계관과 지적 자극을 주는 SF, 혹은 전략적 서사가 돋보이는 스릴러와 궁합이 좋습니다.`,
  },
  ISTP: {
    title: '장인형',
    desc: `문제를 해결하는 데 집중하며, 논리적이고 현실적인 성향을 지녔습니다. 즉흥적이고 유연하지만, 분석적이며 손으로 무언가를 직접 다루는 것을 선호합니다. 위험을 감수하는 모험심도 갖추고 있습니다.`,
    lastSentence: `직관적이고 감각적인 몰입을 즐기기 때문에, 액션 중심의 영화나 서스펜스가 있는 작품을 선호합니다.`,
  },
  ISFP: {
    title: '성인군자형',
    desc: `조용하고 온화하지만 내면에는 강한 미적 감각과 개성을 가지고 있습니다. 현재의 순간을 소중히 여기며 예술, 자연, 인간관계에서 아름다움을 추구합니다. 타인의 감정을 존중하며 자유로운 분위기를 선호합니다.`,
    lastSentence: `감성적이면서도 아름다운 영상미를 담은로맨스나 예술 영화와 잘 맞습니다.`,
  },
  INFP: {
    title: '중재자형',
    desc: `이상과 가치를 중시하며 자기 내면의 진실성과 타인의 감정에 깊이 공감합니다. 공상적이지만 강한 신념을 지니며, 의미 있는 일에 헌신하려는 열망이 있습니다. 창의력과 감성적 표현력이 뛰어납니다.`,
    lastSentence: `자신의 내면을 투영할 수 있는 서정적인 드라마나 감성적인 애니메이션과 궁합이 좋습니다.`,
  },
  INTP: {
    title: '논리술사형',
    desc: `논리적 분석과 지적 탐구에 열정을 가진 사색가입니다. 독창적인 아이디어에 몰두하며 복잡한 시스템을 이해하고 개선하려는 성향이 강합니다. 대체로 내향적이지만 토론에는 적극적입니다.`,
    lastSentence: `복잡한 개념과 아이디어가 얽힌 작품을 즐기기 때문에, 철학적 SF나 퍼즐형 미스터리 영화와 잘 맞습니다.`,
  },
  ESTP: {
    title: '활동가형',
    desc: `즉흥적이고 에너지 넘치며 현실에 집중하는 타입입니다. 감각이 예리하고 문제 해결에 능하며, 스릴 있는 상황을 즐깁니다. 주변 사람들을 매료시키는 매력과 유머 감각도 가지고 있습니다.`,
    lastSentence: `긴장감 넘치는 전개와 속도감 있는 이야기를 즐기기 때문에, 액션이나 범죄 스릴러 장르와 궁합이 좋습니다.`,
  },
  ESFP: {
    title: '사교적인 연예인형',
    desc: `사람들과 어울리는 것을 좋아하고 현재 순간을 즐기는 데 집중합니다. 따뜻하고 활기차며, 주위 분위기를 밝게 만드는 능력이 있습니다. 경험을 통해 배우는 것을 선호합니다.`,
    lastSentence: `에너지 넘치는 스토리와 감정을 풍부하게 담은 뮤지컬이나 로맨틱 코미디와 잘 어울립니다.`,
  },
  ENFP: {
    title: '재기발랄한 활동가형',
    desc: `열정적이고 창의적인 성격으로, 다양한 사람들과의 소통을 즐깁니다. 새로운 아이디어와 가능성에 끌리며, 감정 표현이 풍부하고 낙관적입니다. 독립성과 자율성을 중요하게 여깁니다.`,
    lastSentence: `새로운 세계를 탐험하고 감정을 공유하는 것을 좋아하기 때문에, 판타지나 따뜻한 드라마와 궁합이 좋습니다.`,
  },
  ENTP: {
    title: '논쟁을 즐기는 변론가형',
    desc: `빠른 사고와 재치를 지닌 토론가 타입으로, 아이디어 생성과 혁신에 강합니다. 규칙에 얽매이기보다는 새로운 가능성을 탐구하며 논쟁을 통해 더 나은 해결책을 찾는 데 즐거움을 느끼는 경향이 있어,`,
    lastSentence: `기발하고 반전이 있는 영화나 창의적인 구성의 블랙코미디와 잘 어울립니다.`,
  },
  ESTJ: {
    title: '경영자형',
    desc: `현실적이고 체계적이며 명확한 구조와 규칙을 선호합니다. 리더십이 뛰어나며 조직을 운영하는 데 능력이 있습니다. 책임감이 강하고 결과 중심의 사고방식을 가지고 있습니다.`,
    lastSentence: `확실한 갈등과 해결 구조가 있는 사회 드라마나 법정물과 궁합이 좋습니다.`,
  },
  ESFJ: {
    title: '친선도모형',
    desc: `사교적이고 따뜻한 성격으로, 타인의 요구와 감정에 민감하게 반응합니다. 책임감 있고 협력을 중시하며, 조화를 이루기 위해 노력합니다.`,
    lastSentence: `타인에게 인정받는 것을 중요하게 여기기 때문에 공동체의 이야기를 담은 휴먼 드라마나 사회적 메시지를 전하는 영화에 끌립니다.`,
  },
  ENFJ: {
    title: '정의로운 사회운동가형',
    desc: `이타적이고 카리스마 있는 리더 타입으로, 사람들을 이끌고 돕는 데 능합니다. 강한 직관력과 공감 능력을 통해 타인의 잠재력을 끌어냅니다.`,
    lastSentence: `대의를 위해 헌신하는 경향이 있어 감정의 깊이와 관계의 복잡성을 담은 성장 영화나 리더십 드라마와 궁합이 좋습니다.`,
  },
  ENTJ: {
    title: '대담한 통솔자형',
    desc: `결단력 있고 목표 지향적인 성격으로, 논리와 전략을 바탕으로 미래를 설계합니다. 효율성과 성취를 중요시하며, 리더십이 강하고 추진력이 뛰어납니다.`,
    lastSentence: `감정보다는 객관적 판단에 무게를 두고 있어 결단과 전략이 핵심인 정치 스릴러나 기업/전쟁 관련 서사에 잘 어울립니다.`,
  },
};

const getColorByMbti = (mbti) => {
  if (mbti.includes('NT')) return colorMap.NT;
  if (mbti.includes('NF')) return colorMap.NF;
  if (mbti.includes('ST')) return colorMap.ST;
  if (mbti.includes('SF')) return colorMap.SF;
  return colorMap.default;
};

const MbtiColorText = ({ mbti }) => {
  const color = getColorByMbti(mbti);
  return <h3 className="mbti-color-title" style={{ color }}>{mbti}</h3>;
};

const MBTIResult = () => {
  const router = useRouter();
  const [posterSetCount, setPosterSetCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shineVisible, setShineVisible] = useState(false);
  const [mbti, setMbti] = useState('INTP');
  const [movies, setMovies] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  useEffect(() => {
    const queryMbti = router.query.mbti; // 💡 쿼리스트링에서 mbti 추출
    const storedMbti = localStorage.getItem('mbti')

    const finalMbti = typeof queryMbti === 'string' ? queryMbti : storedMbti || 'INTP';
    setMbti(finalMbti);

    const fetchMovies = async () => {
      try {
        const res = await axios.get(`/movies/mbti-ai/${storedMbti}`);
        if (res.data && Array.isArray(res.data.recommended_movies)) {
          setMovies(res.data.recommended_movies.slice(0, 5));
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('영화 데이터를 불러오지 못했습니다.', error);
        setMovies([]);
      }
    };

    fetchMovies();
  },  [router.query.mbti]);

  const handleAddPosterSet = () => {
    if (posterSetCount >= 4 || loading) return;
    setLoading(true);
    setTimeout(() => {
      setPosterSetCount((prev) => prev + 1);
      setLoading(false);
    }, 1000);
  };

  const handlePosterHover = (index) => {
    setHoveredIndex(index); // 💡 즉시 반영
    setShineVisible(true);  // 💡 바로 활성화
  };

  const renderPosterBoxes = () => {
    const displayMovies = movies.length > 0 ? movies : Array(5).fill(null);
    return Array.from({ length: posterSetCount }, (_, index) => (
      <div className="poster-boxes" key={index} style={{ display: 'flex', gap: '10px' }}>
        {displayMovies.map((movie, i) => (
          <div
            key={i}
            className="poster-placeholder"
            onMouseOver={() => movie && handlePosterHover(i)} // 💡 반응 빠른 이벤트로 변경
            style={{
              backgroundImage: movie?.poster ? `url(${movie.poster})` : '', // ✅ poster로 수정
              backgroundColor: movie?.poster ? 'transparent' : '#EDEDED',
              cursor: movie ? 'pointer' : 'default',
              borderRadius: '6px',
              backgroundSize: 'contain'
            }}
            title={movie ? `${movie.title} (${movie.originalTitle})` : '영화 데이터 없음'}
          />
        ))}
      </div>
    ));
  };

  const hoveredMovie = useMemo(() => movies[hoveredIndex] || {}, [hoveredIndex, movies]); // 💡 즉시 반영
  const mbtiData = mbtiDescriptions[mbti] || {};
  const mbtiColor = getColorByMbti(mbti);

  return (
    <>
      <div className="container">
        <div className="section-one">
          <p style={{ color: 'white', fontSize: '30px', wordSpacing: '-4px' }}>
            당신이 선택한 MBTI는...
          </p>
          <div className="mbti-box">
            <MbtiColorText mbti={mbti} />
            <p
              style={{
                color: 'white',
                fontSize: '32px',
                wordSpacing: '-4px',
                margin: '-20px 0 15px 0',
              }}
            >
              {mbtiData.title || ''}
            </p>
            <p
              style={{
                marginTop: '10px',
                fontSize: '12px',
                lineHeight: '1.5',
                color: '#fff',
                whiteSpace: 'pre-line',
              }}
            >
              {mbtiData.desc || ''}
              <br />
              <span className="important" style={{ color: mbtiColor }}>
                {mbtiData.lastSentence || ''}
              </span>
            </p>
          </div>
        </div>

        <div className="section-two">
          <h3 className="resultIs" style={{ marginBottom: '20px' }}>
            AI가 디렉팅한 나의 MBTI 맞춤 영화는
          </h3>
          {renderPosterBoxes()}
        </div>

        <div className="desc-box">
          <div className={`shine ${shineVisible ? 'visible' : ''}`}>
            <h2 className="movie-title">{hoveredMovie?.title || '영화를 선택해 주세요'}</h2>
            <p className="small">{hoveredMovie?.originalTitle || '영화 제목'}</p>
            <p className="small" style={{ marginBottom: '10px' }}>
            {hoveredMovie?.genres && hoveredMovie?.countries && hoveredMovie?.runtime
                ? `${hoveredMovie.genres.join(', ')} · ${hoveredMovie.countries.join(', ')} · ${hoveredMovie.runtime}분`
                : '장르 · 국가 · 러닝타임'}
            </p>
            <p className="description">{hoveredMovie?.overview || '영화 설명'}</p>
            <p
              style={{
                fontSize: '24px',
                color: '#fff',
                wordSpacing: '-4px',
                marginBottom: '7px',
                textAlign: 'center',
              }}
            >
              추천받은 영화가 마음에 들지 않는다면?
            </p>
            <p style={{ fontSize: '13px', color: '#fff', textAlign: 'center' }}>
              새 키워드를 입력해서 영화를 추천받을 수 있어요.
              <br />
              분위기, 현재 나의 감정, 좋아하는 것을 입력하면 AI가 다시 추천 목록을 제공합니다.
            </p>
            <Input
              className="keyword-input"
              placeholder="키워드 입력"
              style={{ marginTop: '20px' }}
              suffix={
                <SearchOutlined
                  style={{ color: '#aaa', cursor: 'pointer' }}
                  onClick={handleAddPosterSet}
                />
              }
            />
          </div>

          <div className="search-box" style={{ marginTop: '20px' }}>
            <div className="sns-buttons">
              <button className="sns-button">
                <Image
                  src="/images/kakao.png"
                  alt="KakaoTalk"
                  className="middle"
                  width={30}
                  height={30}
                  style={{ cursor: 'pointer' }}
                />
              </button>
              <button className="sns-button">
                <Image
                  src="/images/facebook.png"
                  alt="Facebook"
                  className="middle"
                  width={30}
                  height={30}
                  style={{ cursor: 'pointer', marginRight: '0.05em' }}
                />
              </button>
              <button className="sns-button">
                <Image
                  src="/images/instagram.png"
                  alt="Instagram"
                  className="middle"
                  width={30}
                  height={30}
                  style={{ cursor: 'pointer' }}
                />
              </button>
              <button className="sns-button">
                <Image
                  src="/images/X.png"
                  alt="X"
                  className="middle"
                  width={27}
                  height={27}
                  style={{ cursor: 'pointer' }}
                />
              </button>
              <button className="sns-button">
                <Image
                  src="/images/link.png"
                  alt="Link"
                  className="middle"
                  width={30}
                  height={30}
                  style={{ cursor: 'pointer' }}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="middle" style={{ gap: '20px' }}>
          <Link href="/" legacyBehavior>
            <Button className="button-confirm-white" type="text">
              결과 다시 보기
            </Button>
          </Link>
          <Link href="/" legacyBehavior>
            <Button className="button-confirm-white" type="text">
              처음으로
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MBTIResult;
