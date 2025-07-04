import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import 'antd/dist/antd.css';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Button, Dropdown, Space, message } from 'antd';
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
    
  .title{
    color: white;
    font-size: 45px;
    display: flex;
    justifyContent: center;
    alignItems: center;
    min-width: auto;
    height: auto;
    margin: 0 auto;
    font-family: 'Orbit', system-ui;
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
    color: #cccccc;
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

  .input {
    background-color: transparent;
    color: #B5B5B5;
    border: 1px solid #FFFFFF;
    border-radius: 25px;
    padding: 0 20px !important;
    height: 40px;
    min-width: 430px;
    font-family: 'Inter', system-ui;
  }

  .ant-input {
    background-color: transparent !important;
    color: #B5B5B5;
  }

  .ant-input-affix-wrapper {
    background-color: transparent !important;
    border: 1px solid #FFFFFF !important;
    border-radius: 25px !important;
    padding: 0 20px !important;
    height: 40px;
    min-width: 430px;
    font-family: 'Inter', system-ui;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }

  .input:hover,
  .input:focus,
  .input-focused{
    box-shadow: none !important;
    border: 1px solid #FFFFFF !important;
  }

  .ant-input-affix-wrapper > .ant-input:not(textarea) {
    padding: 0px;
  }

  .ant-input::placeholder {
    font-size: 13px;
    font-family: 'Inter', system-ui;
    color: #B5B5B5;
    opacity: 0.7;
  }

  .dropdown-button.ant-btn {
  background-color: transparent !important;
  color: #B5B5B5 !important;
  border: 1px solid #FFFFFF !important;
  border-radius: 25px !important;
  height: 40px !important;
  min-width: 430px !important;
  padding: 0 20px !important;
  font-family: 'Inter', system-ui;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  line-height: 40px !important;
}

.dropdown-button.ant-btn:hover,
.dropdown-button.ant-btn:focus,
.dropdown-button.ant-btn:active {
  border: 1px solid #FFFFFF !important;
  color: #B5B5B5 !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

.mbti {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.7;
  font-family: 'Inter', system-ui;
  font-size: 13px;
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

const handleMenuClick = e => {
  console.log('click', e);
};

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

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const Signup = () => {
  const [messageKeys, setMessageKeys] = useState([]);
    const reel = {
      display: 'inline-block',
      color: '#7C00FE',
      width: '20px',
      height: '20px',
      marginRight: '5px',
      position: 'relative',
      top: '0.2em',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath fill=%27%237C00FE%27 fill-rule=%27evenodd%27 d=%27M2 12c0 5.523 4.477 10 10 10h9.25a.75.75 0 0 0 0-1.5h-3.98A9.99 9.99 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12m10-3a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m0 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-4.5-7.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M18 12a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0%27 clip-rule=%27evenodd%27/%3E%3C/svg%3E')",
    };
  const showCustomMessage = () => {
  const newKey = `msg_${Date.now()}`;

  setMessageKeys((prevKeys) => {
    let updatedKeys = [...prevKeys];

    if (updatedKeys.length >= 7) {
      const [oldestKey, ...rest] = updatedKeys;
      message.destroy(oldestKey);
      updatedKeys = [...rest];
    }

    const nextKeys = [...updatedKeys, newKey];
    setMessageKeys(nextKeys);

    setTimeout(() => {
      message.open({
        key: newKey,
        content: '요청하신 주소로 메일을 보냈습니다.',
        icon: <div style={reel}></div>,
        duration: 3,
        className: 'custom-message',
      });
    }, updatedKeys.length < 7 ? 0 : 300);
    return nextKeys;
  });
};

  return (
    <>
    <GlobalStyle />
    <div className="middle" style={{ marginBottom: '25px' }}>
      <Loader style={{ alignItems: 'center' }} />
    </div>
    <div className="middle">
      <h3 className="title">비밀번호 찾기</h3>
    </div>
    <span className="content"> </span>
    <Form
      name="findpass"
      layout="vertical"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
      }}
    >
    <Dropdown menu={menuProps}>
      <Button className="dropdown-button">
        <Space className="mbti">
          mbti <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
      <Form.Item name="username">
        <Input placeholder="유저명" className="input" />
      </Form.Item>
      <Form.Item name="email">
        <Input placeholder="아이디(이메일)" className="input" />
      </Form.Item>
    </Form>
    <div className="middle" style={{marginTop: '25px', gap: '20px'}}>
      <Link href="/login" legacyBehavior><Button className="confirm" type="text">
        로그인
      </Button></Link>
      <Link href="/findpass" legacyBehavior>
      <Button className="confirm" type="text" onClick={showCustomMessage}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          메일 전송
          <Icon icon="bitcoin-icons:arrow-right-filled" width="12" height="12" style={{position: 'relative', bottom: '0.05em'}} />
        </span>
      </Button>
    </Link>
    </div>
    <AppLayout />
  </>
  );
};
export default Signup;
