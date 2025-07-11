import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Button, Dropdown, Space, message } from 'antd';
import Loader from '../components/Loader';
import AppLayout from '../components/AppLayout';
import { MessageContext } from '../components/MessageProvider';

const mbtiList = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

const Signup = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [selectedMBTI, setSelectedMBTI] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showCustomMessage } = useContext(MessageContext); 

  const handleMenuClick = ({ key }) => {
    const mbti = mbtiList[parseInt(key) - 1];
    setSelectedMBTI(mbti);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!selectedMBTI) {
        showCustomMessage('MBTI를 선택해주세요.');
        return;
      }

      if (values.password !== values.passwordRe) {
        showCustomMessage('비밀번호가 일치하지 않습니다.');
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

      const response = await axios.post('http://localhost:8080/movies/signup', payload);
      localStorage.setItem('signupUser', JSON.stringify(payload));
      showCustomMessage('회원가입 성공!');
      router.push('/login');
    } catch (error) {
      console.error('회원가입 오류:', error);
      showCustomMessage('회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('signupUser');
    if (saved) {
      const parsed = JSON.parse(saved);
      form.setFieldsValue({
        username: parsed.nickname,
        email: parsed.username,
        age: parsed.age,
        password: parsed.password,
        passwordRe: parsed.password,
      });
      setSelectedMBTI(parsed.mbti);
    }
  }, []);


  const menuItems = mbtiList.map((mbti, index) => ({
    label: mbti,
    key: `${index + 1}`,
  }));

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
        <h3 className="title">Enter the<span className="colortitle">&nbsp;Cinemine</span></h3>
      </div>
      <span className="content"><Link href="/findpass">비밀번호 찾기</Link></span>
      <Form
        form={form}
        layout="vertical"
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}
      >
        <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }}>
          <Button className="dropdown-button black" style={{marginBottom: '0px'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span>{selectedMBTI || 'mbti'}</span>
              <DownOutlined />
            </div>
          </Button>
        </Dropdown>

        <Form.Item name="username" rules={[{ required: true, message: '유저명을 입력해주세요' }]}>
          <Input placeholder="유저명" className="input-black" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: '이메일을 입력해주세요' },
            { type: 'email', message: '이메일 형식이 아닙니다.' }
          ]}
        >
          <Input placeholder="아이디(이메일)" className="input-black" />
        </Form.Item>
        <Form.Item
          name="age"
          rules={[
            { required: true, message: '연령을 입력해주세요' },
            { pattern: /^[0-9]+$/, message: '숫자만 입력 가능합니다' }
          ]}
        >
          <Input
            placeholder="연령"
            className="input-black"
            disabled
            style={{
              border: '1px solid rgba(255, 255, 255, 0.7)',
              backgroundColor: 'transparent',
              color: 'white',
            }}
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}>
          <Input.Password placeholder="비밀번호" className="input-black" />
        </Form.Item>
        <Form.Item name="passwordRe" rules={[{ required: true, message: '비밀번호 확인을 입력해주세요' }]}>
          <Input.Password placeholder="비밀번호 확인" className="input-black" />
        </Form.Item>
      </Form>

      <div className="middle" style={{ marginTop: '25px', gap: '20px' }}>
        <Link href="/mypage">
          <Button className="button-black" type="text">취소</Button>
        </Link>
        <Button className="button-confirm-white" type="text" onClick={handleSubmit}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            정보 변경
            <Icon icon="bitcoin-icons:arrow-right-filled" width="12" height="12" />
          </span>
        </Button>
      </div>

      <AppLayout />
    </>
  );
};

export default Signup;
