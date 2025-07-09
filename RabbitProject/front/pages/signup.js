import React, { useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Button, Dropdown, Space, message } from 'antd';
import Loader from '../components/Loader';
import AppLayout from '../components/AppLayout';

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

  const handleMenuClick = ({ key }) => {
    const mbti = mbtiList[parseInt(key) - 1];
    setSelectedMBTI(mbti);
    message.success(`${mbti} 선택됨`);
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
        mbti: selectedMBTI
      };

      const response = await axios.post('http://localhost:8080/movies/signup', payload);
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

  const menuItems = mbtiList.map((mbti, index) => ({
    label: mbti,
    key: `${index + 1}`,
  }));

  return (
    <>
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
          <Input placeholder="유저명" className="login-input" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: '이메일을 입력해주세요' }]}>
          <Input placeholder="아이디(이메일)" className="login-input" />
        </Form.Item>
        <Form.Item name="age" rules={[{ required: true, message: '연령을 입력해주세요' }]}>
          <Input placeholder="연령" className="login-input" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}>
          <Input.Password placeholder="비밀번호" className="login-password" />
        </Form.Item>
        <Form.Item name="passwordRe" rules={[{ required: true, message: '비밀번호 확인을 입력해주세요' }]}>
          <Input.Password placeholder="비밀번호 확인" className="login-password" />
        </Form.Item>
      </Form>

      <div className="middle" style={{ marginTop: '25px', gap: '20px' }}>
        <Link href="/login">
          <Button className="button-black" type="text">로그인</Button>
        </Link>
        <Button className="button-confirm-white" type="text" onClick={handleSubmit}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            회원가입
            <Icon icon="bitcoin-icons:arrow-right-filled" width="12" height="12" />
          </span>
        </Button>
      </div>

      <AppLayout />
    </>
  );
};

export default Signup;
