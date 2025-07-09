import Sidebar from '../components/Sidebar';
import Wavebox from '../components/Wavebox';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Orbit&family=Paprika&display=swap');


body {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #1C1C1C;
  }

a {
    color: #B5B5B5;
    text-decoration: none;
    opacity: 0.7;
  }

h3 {
  margin-bottom: 0.1em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
    color: #black;
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
  color: #black;
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

.ant-form-item {
  margin-bottom: 0px;
}
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Sidebar />
      <Wavebox />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
