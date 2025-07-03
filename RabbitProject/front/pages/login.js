import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import 'antd/dist/antd.css';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Button, Dropdown, Space } from 'antd';
import AppLayout from '../components/AppLayout'; 
import { createGlobalStyle } from 'styled-components';
import Loader from '../components/Loader';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter&family=Orbit&family=Paprika&display=swap');
 
  body{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
    
  .title{
    color: white;
    font-size: 45px;
    display: flex;
    justifyContent: center;
    alignItems: center;
    min-width: auto;
    height: auto;
    margin: 0 auto;
    font-family: "Paprika", system-ui;
  }
  
  .colortitle{
    margin: 0 auto;
    background: linear-gradient(75deg, #b13bff 0%, #A021EA 30%, #9000FF 70%, #8f62ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .mbti{
    gap: 280px !important;
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
  
  a {
    color: #B5B5B5;
    text-decoration: none;
  }

  a:hover,
  a:focus,
  a:visited,
  a:active {
    color:rgb(211, 211, 211);
    text-decoration: none;
  }

  .ant-btn-text {
  color: white;
  font-size: 11px;
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

  .ant-btn-text:hover, .ant-btn-text:active, .ant-btn-text:focus {
  color: black;
  background-color: #ffffff;
}

  .dropdown-button.ant-btn{
    color: #B5B5B5;
    padding: 20px 20px;
    border-radius: 25px;
    min-width: 430px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .middle {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .confirm {
    max-height: 40px;
    max-width: 120px;
    font-size: 12px;
    padding: 15px 40px;
    border: 1px solid #FFFFFF;
    border-radius: 25px;
    color: #B5B5B5;
    background: transparent;
    font-family: 'Inter', system-ui;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .confirm:hover,
  .confirm:focus,
  .confirm:active {
    color: black;
    background-color: #ffffff;
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

  .ant-input {
    background-color: #FFFFFF !important;
    color: #black;
  }

  .ant-input-affix-wrapper {
    background-color: #FFFFFF !important;
    border: 1px solid #FFFFFF;
    border-radius: 25px !important;
    padding: 0 20px !important;
    height: 40px;
    min-width: 430px;
    font-family: 'Inter', system-ui;
    color: #B5B5B5;
    display: flex;
    align-items: center;
    box-sizing: border-box;
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

  /* 비밀번호 내부 input */
  .ant-input-password input {
    border: 1px solid #FFFFFF;
    background-color: #FFFFFF !important;
    color: #black !important;
    border: none;
    font-family: 'Inter', system-ui;
    padding: 0;
    line-height: 40px;
  }

  .ant-input-password-icon svg {
    color: #B5B5B5;
  }

  .ant-input-affix-wrapper > .ant-input:not(textarea) {
    padding: 0px;
  }

  .ant-input::placeholder,
  .ant-input-password input::placeholder {
    font-size: 13px;
    font-family: 'Inter', system-ui;
    color: #B5B5B5;
  }

.ant-form-item {
  margin-bottom: 0 !important;
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
`;

const items = [
  {
    label: 'ISTJ',
    key: '1',
  },
  {
    label: 'ISFJ',
    key: '2',
  },
  {
    label: 'INFJ',
    key: '3',
  },
  {
    label: 'INTJ',
    key: '4',
  },
  {
    label: 'ISTP',
    key: '5',
  },
  {
    label: 'ISFP',
    key: '6',
  },
  {
    label: 'INFP',
    key: '7',
  },
  {
    label: 'INTP',
    key: '8',
  },
  {
    label: 'ESTP',
    key: '9',
  },
  {
    label: 'ESFP',
    key: '10',
  },
  {
    label: 'ENFP',
    key: '11',
  },
  {
    label: 'ENTP',
    key: '12',
  },
  {
    label: 'ESTJ',
    key: '13',
  },
  {
    label: 'ESFJ',
    key: '14',
  },
  {
    label: 'ENFJ',
    key: '15',
  },
  {
    label: 'ENFJ',
    key: '16',
  },
];

const Login = () => {
  return (
    <>
    <AppLayout />
    <GlobalStyle />
    <div className="middle" style={{ marginBottom: '25px' }}>
      <Loader style={{ alignItems: 'center' }} />
    </div>
    <div className="middle">
      <h3 className="title">Join to<span className="colortitle">&nbsp;Cinemine</span></h3>
    </div>
    <span className="content"><Link href="/findpass" legacyBehavior>비밀번호 찾기</Link></span>
    <Form
      name="login"
      layout="vertical"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
      }}
    >
      <Form.Item name="email">
        <Input placeholder="아이디(이메일)" className="login-input" />
      </Form.Item>
      <Form.Item name="password">
        <Input.Password placeholder="비밀번호" className="login-password" />
      </Form.Item>
    </Form>
    <div className="middle" style={{marginTop: '25px', gap: '20px'}}>
      <Link href="/signup" legacyBehavior><Button className="confirm" type="text">
        회원가입
      </Button></Link>
      <Link href="/" legacyBehavior>
      <Button className="confirm" type="text">
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          로그인
          <Icon icon="bitcoin-icons:arrow-right-filled" width="12" height="12" style={{position: 'relative', bottom: '0.05em'}} />
        </span>
      </Button>
    </Link>
    </div>
  </>
  );
};
export default Login;
