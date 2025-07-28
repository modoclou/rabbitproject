import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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

  return (<h3 className="mbti-color" style={{ color, margin: 0 }}>{mbti}</h3>);
};

const MyPage = () => {
  const [nickname, setNickname] = useState('');
  const [mbti, setMbti] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname') || '';
    const storedMbti = localStorage.getItem('mbti') || '';
    const storedUsername = localStorage.getItem('username') || '';
    setNickname(storedNickname);
    setMbti(storedMbti);
    setUsername(storedUsername);
  }, []);

  return (
  <>
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        marginLeft: '0px',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          marginTop: '80px',
          display: 'flex',
          alignItems: 'baseline',
          gap: '10px',
          textAlign: 'left',
        }}
      >
        <h3 className="menu-title" style={{ margin: 0 }}>
          {nickname} / {username}
        </h3>
        <span
          className="content"
          style={{
            margin: 0,
            display: 'flex',
            alignItems: 'baseline',
            gap: '10px',
            textAlign: 'left',
          }}
        >
          {/* <Link href={{
                pathname: '/changeinfo',
                query: { nickname },
              }}
              legacyBehavior>
            <a>정보 변경</a>
          </Link> */}
          <Link href={{
                pathname: '/changepass',
                query: { username },
            }}
            legacyBehavior>
            <a>비밀번호 변경</a>
          </Link>
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '10px',
          textAlign: 'left',
        }}
      >
        <h3
          className="menu-title"
          style={{ marginTop: 0, textAlign: 'left', display: 'flex', alignItems: 'baseline', gap: '8px' }}
        >
          <span>나의 MBTI:</span>
          <MbtiColorText mbti={mbti} />
        </h3>
      </div>
    </div>
  </>
);
};

export default MyPage;