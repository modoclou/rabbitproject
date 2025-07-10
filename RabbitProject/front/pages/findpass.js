import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import 'antd/dist/antd.css';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Button, Dropdown, message } from 'antd';
import AppLayout from '../components/AppLayout';
import Loader from '../components/Loader';
import axios from 'axios';
import { useRouter } from 'next/router';

const mbtiList = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

const Findpass = () => {
  const router = useRouter();
  const [messageKeys, setMessageKeys] = useState([]);
  const [selectedMBTI, setSelectedMBTI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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
    backgroundImage:
      "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath fill=%27%237C00FE%27 fill-rule=%27evenodd%27 d=%27M2 12c0 5.523 4.477 10 10 10h9.25a.75.75 0 0 0 0-1.5h-3.98A9.99 9.99 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12m10-3a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m0 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-4.5-7.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M18 12a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0%27 clip-rule=%27evenodd%27/%3E%3C/svg%3E')",
  };

  const handleMenuClick = ({ key }) => {
    const mbti = mbtiList[parseInt(key) - 1];
    setSelectedMBTI(mbti);
    message.success(`${mbti} 선택됨`);
  };

  const menuItems = mbtiList.map((mbti, index) => ({
    label: mbti,
    key: `${index + 1}`,
  }));

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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!selectedMBTI) {
        message.warning('MBTI를 선택해주세요.');
        return;
      }

      if (values.password !== values.passwordRe) {
        message.error('비밀번호가 일치하지 않습니다.');
        return;
      }

      setLoading(true);

      const payload = {
        nickname: values.username,
        username: values.email,
        age: values.age,
        password: values.password,
        mbti: selectedMBTI,
      };

      const response = await axios.post(
        'http://localhost:8080/movies/signup',
        payload
      );
      message.success('회원가입 성공!');
      router.push('/login');
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('회원가입 오류:', error);
      message.error('회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
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
        <Loader isActive={loading} />
      </div>
      <div className="middle">
        <h3 className="menu-title-pass">비밀번호 찾기</h3>
      </div>
      <span className="content"> </span>
      <Form
        form={form}
        name="findpass"
        layout="vertical"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }}>
          <Button className="dropdown-button black" style={{ marginBottom: '0px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <span>{selectedMBTI || 'mbti'}</span>
              <DownOutlined />
            </div>
          </Button>
        </Dropdown>

        <Form.Item name="username">
          <Input placeholder="유저명" className="input-black" />
        </Form.Item>
        <Form.Item name="email">
          <Input placeholder="아이디(이메일)" className="input-black" />
        </Form.Item>
      </Form>
      <div className="middle" style={{ marginTop: '25px', gap: '20px' }}>
        <Link href="/findpass" legacyBehavior>
          <Button className="button-confirm-white" type="text" onClick={showCustomMessage}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              메일 전송
              <Icon
                icon="bitcoin-icons:arrow-right-filled"
                width="12"
                height="12"
                style={{ position: 'relative', bottom: '0.05em' }}
              />
            </span>
          </Button>
        </Link>
      </div>
      <AppLayout />
    </>
  );
};

export default Findpass;
