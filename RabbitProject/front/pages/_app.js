import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Wavebox from '../components/Wavebox';
import { createGlobalStyle } from 'styled-components';
import AuthProvider from '../components/AuthProvider';
import MessageProvider from '../components/MessageProvider';

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

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    letter-spacing: -0.03em;
    box-sizing: border-box;
  }

body {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #1C1C1C;
  -webkit-align-items: flex-start;
  }

h3 {
  margin-bottom: 0.1em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

a {
    color: #B5B5B5;
    text-decoration: none;
    opacity: 0.7;
  }

p{
  font-family: 'Orbit', system-ui;
}

.middle{
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.custom-message .ant-message-notice-content {
    border-radius: 25px !important;
  }

  .custom-message .ant-message-notice-content .ant-message-custom-content {
    margin-bottom: 0.2em !important; /* 0.2em 위로 올리기 */
  }

  ::-moz-selection {
  color: #fff;
  background: #1c181d;
  }

  ::selection {
    color: #fff;
    background: #1c181d;
  }

  .menu-title {
    margin-top: 80px;
    font-size: 36px;
    color: #ffffff;
    letter-spacing: -1px;
    display: flex;
    justify-content: center !important;
    align-items: center !important;
    font-family: 'Orbit', system-ui;
  }

  .menu-title-pass {
    font-size: 36px;
    color: #ffffff;
    letter-spacing: -1px;
    display: flex;
    justify-content: center !important;
    align-items: center !important;
    font-family: 'Orbit', system-ui;
  }

.title{
    color: white;
    font-size: 45px;
    display: flex;
    min-width: 505px;
    height: auto;
    font-family: "Paprika", system-ui;
  }
  
  .colortitle{
    background: linear-gradient(75deg, #b13bff 0%, #A021EA 30%, #9000FF 70%, #8f62ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .mbti-title {
    font-family: 'Paprika', cursive;
    font-size: 54px;
    color: #BA62B9;
    margin: 0 auto;
    display: block;
  }

  a.ant-btn {
    padding: 0 auto;
    line-height: 30px;
}

.ant-btn-text {
  color: #cccccc;
  font-size: 12px;
  border: 1px solid #FFFFFF;
  border-radius: 25px;
  font-family: 'Inter', system-ui;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  line-height: 1;
}

.ant-btn-text:hover, .ant-btn-text:active, .ant-btn-text:focus {
  color: black;
  background-color: #ffffff;
}

/* 비밀번호 찾기 */
.content-discription{
    color: white;
    font-size: 13px;
    text-align: center;
    align-items: center;
    display: block;
    margin: 0 0 50px 0;
    font-family: "Orbit", system-ui;
  }

.content {
  display: block;
  margin: 0 auto 40px auto;
  text-align: center;
  color: #B5B5B5;
  text-decoration: none;
  font-size: 11px;
  font-family: 'Inter', system-ui;
}

.content a {
  color: #B5B5B5;
  text-decoration: none;
  font-size: 11px;
  font-family: 'Inter', system-ui;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.button-black {
  max-height: 40px !important;
  max-width: 120px !important;
  font-size: 12px;
  padding: 0px 40px !important; /* 패딩 제거 */
  line-height: 40px; /* 높이와 맞춤 */
  border: 1px solid #FFFFFF;
  border-radius: 25px;
  color: #cccccc;
  background: transparent;
  font-family: 'Inter', system-ui;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-black:hover,
.button-black:focus,
.button-black:active {
  color: black;
  background-color: #ffffff;
}

.button-confirm-white {
  max-height: 40px !important;
  max-width: 120px !important;
  font-size: 12px;
  padding: 0px 40px !important;
  line-height: 40px;
  border: 1px solid #FFFFFF;
  border-radius: 25px;
  color: black;
  background-color: white;
  font-family: 'Inter', system-ui;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}
.button-confirm-white:hover,
.button-confirm-white:focus,
.button-confirm-white:active {
  color: #cccccc;
  background-color: transparent;
  border: 1px solid #FFFFFF;
}

.input-black {
  opacity: 0.7;
  background-color: transparent !important;
  color: #B5B5B5 !important;
  border: 1px solid #FFFFFF !important;
  border-radius: 25px !important;
  height: 40px !important;
  width: 430px !important;

  padding-left: 20px !important;
  padding-right: 20px !important;

  font-family: 'Inter', system-ui;
  box-sizing: border-box;
  line-height: 40px !important;
}

.ant-input[disabled] {
    opacity: 0.7;
}

.ant-dropdown-menu {
    position: relative;
    margin: 0;
    padding: 4px 0;
    text-align: left;
    list-style-type: none;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 2px;
    outline: none;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    max-height: 25.5em !important;
    overflow-y: auto !important;
}

.dropdown-button.ant-btn{
  color: #B5B5B5;
  padding: 20px 20px;
  border-radius: 25px;
  min-width: 430px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.dropdown-button.black {
  /* 기존 스타일 유지 */
  opacity: 0.7;
  background-color: transparent !important;
  color: #B5B5B5 !important;
  border: 1px solid #FFFFFF !important;
  border-radius: 25px !important;
  height: 40px !important;
  max-width: 430px !important;

  /* padding으로 좌우 여백 조절 */
  padding-left: 20px !important;
  padding-right: 20px !important;

  font-family: 'Inter', system-ui;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 양끝 정렬 */
  box-sizing: border-box;
  line-height: 40px !important;
}

/* white 스타일 드롭다운 버튼 내부 레이아웃 */
.dropdown-button.white {
  /* 기존 스타일 유지 */
  color: #B5B5B5;
  border-radius: 25px;
  min-width: 430px;
  height: 40px;

  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  /* padding으로 좌우 여백 조절 */
  padding-left: 20px;
  padding-right: 20px;

  font-family: 'Inter', system-ui;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 양끝 정렬 */
  box-sizing: border-box;
}

  .login-input,
  .login-password {
    background-color: #FFFFFF;
    color: black;
    border-radius: 25px;
    padding: 0 20px !important;
    height: 40px;
    min-width: 430px;
    font-family: 'Inter', system-ui;
  }

  .login-input:hover,
  .login-input:focus,
  .login-input-focused{
    box-shadow: none !important;
    border: 1px solid #FFFFFF !important;
  }

.login-password:hover,
  .login-password:focus,
  .login-password-focused{
    box-shadow: none !important;
    border: 1px solid #FFFFFF !important;
  }

.ant-input-password input {
    background-color: transparent !important;
    color: #B5B5B5 !important;
    border: none;
    font-family: 'Inter', system-ui;
    padding: 0;
    line-height: 40px;
  }

  .ant-input-password-icon svg {
    color: #B5B5B5;
    transition: color 0.2s ease;
  }

  .ant-input-password-icon svg:hover {
    color:rgb(139, 139, 139);
  }

  .ant-input::placeholder,
  .ant-input-password input::placeholder {
    font-size: 13px;
    font-family: 'Inter', system-ui;
    color: #B5B5B5;
    opacity: 0.7;
  }

.keyword-input {
  font-size: 13px;
  background-color: #FFFFFF;
  border: 1px solid #FFFFFF;
  color: black;
  border-radius: 25px;
  padding: 0 20px !important;
  height: 40px;
  min-width: 430px;
  font-family: 'Inter', system-ui;
}

.keyword-input:hover,
.keyword-input:focus,
.keyword-input-focused {
  box-shadow: none !important;
  border: 1px solid #FFFFFF !important;
}

.search-icon {
  color: #B5B5B5;
  transition: color 0.2s ease;
  cursor: pointer;
}

.search-icon:hover {
  color: rgb(139, 139, 139);
}

.search-box {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.ant-form-item {
  margin-bottom: 0px;
}

.menu-title {
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
    margin-top: 40px;
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

  .mbti-color-title {
    font-size: 45px;
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
  margin: 12px 0 0 0;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Orbit', system-ui;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;
}

  .type{
    min-width: 90px;
    max-width: auto;
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
  width: 800px;
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
  width: 800px;
  margin: 0 auto;
}

.poster-boxes {
  display: flex;
  // gap: 10px;
  margin-top: 13px;
  justify-content: space-between;
}

.poster-placeholder {
  width: 148.84px;
  height: 238px;
  background-color: #EDEDED;
  border-radius: 5px;
  display: inline-block; /* 가로 정렬 */
  margin-bottom: 0;
  position: relative; /* shine 위치 조정 위해 */
  transition: margin-bottom 0.2s ease;
  transition: transform 0.2s ease;
}

/* hover 시 10px 위로 이동 - margin 대신 transform 사용해서 주변 밀림 방지 */
.poster-placeholder:hover {
  transform: translateY(-10px);
}

/* .shine 기본 숨김 */
.poster-placeholder .shine {
  display: none;
  position: absolute;
  bottom: 100%; /* 포스터 바로 위 */
  left: 0;
  width: 100%;
  padding: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #000;
  font-size: 12px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  pointer-events: none; /* shine 위로 마우스 이벤트가 가지 않게 */
  user-select: none;
}

.poster-placeholder:hover .shine {
  display: block;
}

.desc-box {
  background: linear-gradient(
    to bottom,
    rgba(34, 34, 34, 1) 0%,
    rgba(28, 28, 28, 0) 100%
  );
  border-radius: 10px;
  padding: 30px;
  width: 800px;
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
  text-shadow: 0 0 5pxrgb(255, 255, 255);
  margin: 0 auto;
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
  
.important{
  color: #D374C9;
  text-shadow: 0 0 5px #D374C9;
}

.resultIs{
  font-size: 24px;
  margin-bottom: 25px;
  font-family: 'Orbit', system-ui;
  color:rgb(255, 255, 255);
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

.shine {
  margin-bottom: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 0.1s ease, max-height 0.1s ease;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
}

.shine.visible {
  overflow: visible;
  max-height: 1000px;
}
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Orbit&family=Paprika&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <AuthProvider>
      <MessageProvider>
        <Sidebar />
        <Component {...pageProps} />
      </MessageProvider>
      <Wavebox />
      </AuthProvider>
    </>
  );
}

export default MyApp;
