import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import Loader from '../components/Loader';
import { MessageContext } from '../components/MessageProvider';
import { AuthContext } from '../components/AuthProvider';

const Login = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { showCustomMessage } = useContext(MessageContext);
  const { login } = useContext(AuthContext);  // AuthContext에서 login 함수 가져오기

  const onFinish = async (values) => {
    const { email, password } = values;
    setLoading(true);

    try {
      const response = await fetch('/movies/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      if (!response.ok) throw new Error('로그인 실패');
      const data = await response.json();
      login(data.token, data.nickname);
      localStorage.setItem('mbti', data.mbti);
      localStorage.setItem('username', email);

      showCustomMessage('로그인되었습니다.', 'success');
      router.push('/').then(() => {
      router.reload();
    });
    } catch (error) {
      console.error(error);
      showCustomMessage('아이디 또는 비밀번호가 잘못되었습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <head>
        <style>{`body { -webkit-align-items: center; }`}</style>
      </head>
      <div className="middle" style={{ marginBottom: '25px' }}>
        <Loader style={{ alignItems: 'center' }} />
      </div>
      <div className="middle">
        <h3 className="title">
          Join to<span className="colortitle">&nbsp;Cinemine</span>
        </h3>
      </div>
      <span className="content">
        <Link href="/findpass" legacyBehavior>비밀번호 찾기</Link>
      </span>
      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={onFinish}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: '이메일을 입력해주세요.' },
            { type: 'email', message: '이메일 형식이 아닙니다.' },
          ]}
        >
          <Input placeholder="아이디(이메일)" className="login-input" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <Input.Password placeholder="비밀번호" className="login-password" autoComplete="current-password" />
        </Form.Item>
        <div className="middle" style={{ marginTop: '25px', gap: '20px' }}>
          <Link href="/signup" legacyBehavior>
            <Button className="button-black" type="text">
              회원가입
            </Button>
          </Link>
          <Button
            htmlType="submit"
            className="button-confirm-white"
            type="text"
            loading={loading}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              로그인
              <Icon
                icon="bitcoin-icons:arrow-right-filled"
                width="12"
                height="12"
                style={{ position: 'relative', bottom: '0.05em' }}
              />
            </span>
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Login;
