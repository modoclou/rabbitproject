import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import 'antd/dist/antd.css';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Button, Dropdown, Space, message } from 'antd';
import AppLayout from '../components/AppLayout'; 
import Loader from '../components/Loader';

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
        content: '비밀번호가 변경되었습니다.',
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
    <head>
      <style>
        {`body{
          -webkit-align-items: center;
        }`}
      </style>
    </head>
    <div className="middle" style={{ marginBottom: '25px' }}>
      <Loader style={{ alignItems: 'center' }} />
    </div>
    <div className="middle">
      <h3 className="menu-title-pass">비밀번호 변경</h3>
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
      <Form.Item name="password">
        <Input.Password placeholder="비밀번호" className="input-black" />
      </Form.Item>
      <Form.Item name="passwordRe">
        <Input.Password placeholder="비밀번호 확인" className="input-black" />
      </Form.Item>
    </Form>
    <div className="middle" style={{marginTop: '25px', gap: '20px'}}>
      <Link href="/changepass" legacyBehavior>
      <Button className="button-confirm-white" type="text" onClick={showCustomMessage}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          변경하기
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
