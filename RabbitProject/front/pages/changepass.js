import React, { useContext, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { MessageContext } from '../components/MessageProvider';
import Loader from '../components/Loader';

const ChangePassword = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { showCustomMessage } = useContext(MessageContext);

  const handleChangePassword = async () => {
    try {
      const values = await form.validateFields();
      if (values.password !== values.passwordRe) {
        showCustomMessage('비밀번호가 일치하지 않습니다.');
        return;
      }
      setLoading(true);

      // 백엔드 API 요청
      await axios.patch('http://localhost:8080/movies/change-password', {
        username: '',
        newPassword: values.password,
        confirmPassword: values.passwordRe,
      });
      showCustomMessage('비밀번호가 성공적으로 변경되었습니다.');
      router.push('/login');

    } catch (error) {
      console.error(error);
      showCustomMessage('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  /* 기존 비밀번호 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('signupUser');
    if (saved) {
      const parsed = JSON.parse(saved);
      form.setFieldsValue({
        password: parsed.password,
        passwordRe: parsed.password,
      });
    }
  }, []); */

  return (
    <>
      <head>
        <style>{`body{-webkit-align-items: center;}`}</style>
      </head>

      <div className="middle" style={{ marginBottom: '25px' }}>
        <Loader isActive={loading} />
      </div>
      <div className="middle">
        <h3 className="menu-title-pass">비밀번호 변경</h3>
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
        <Form.Item
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
        >
          <Input.Password placeholder="비밀번호" className="input-black" />
        </Form.Item>
        <Form.Item
          name="passwordRe"
          rules={[{ required: true, message: '비밀번호 확인을 입력해주세요.' }]}
        >
          <Input.Password placeholder="비밀번호 확인" className="input-black" />
        </Form.Item>
      </Form>
      <div className="middle" style={{ marginTop: '25px', gap: '20px' }}>
        <Button className="button-confirm-white" type="text" onClick={handleChangePassword}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            변경하기
            <Icon
              icon="bitcoin-icons:arrow-right-filled"
              width="12"
              height="12"
              style={{ position: 'relative', bottom: '0.05em' }}
            />
          </span>
        </Button>
      </div>
    </>
  );
};

export default ChangePassword;
