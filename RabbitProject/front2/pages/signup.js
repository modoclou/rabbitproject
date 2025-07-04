import React, { useState } from 'react';
import 'antd/dist/antd.css';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Button, Dropdown, Space, message } from 'antd';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import Loader from '../components/Loader';
import AppLayout from '../components/AppLayout';

const mbtiList = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

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
    opacity: 0.7;
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

.content a {
  color: #B5B5B5;
  text-decoration: none;
  font-size: 11px;
  font-family: 'Inter', system-ui;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.content a:hover{
  color: #b9b9b9 !important;
  opacity: 1;
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

  .login-input,
  .login-password {
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

  .login-input:hover,
  .login-input:focus,
  .login-input-focused{
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

  .ant-input-affix-wrapper > .ant-input:not(textarea) {
    padding: 0px;
  }

  .ant-input::placeholder,
  .ant-input-password input::placeholder {
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
  justify-content: space-between; /* 오른쪽 화살표와 좌측 텍스트 간격 맞춤 */
  box-sizing: border-box;
  line-height: 40px !important; /* 높이 정렬 보정 */
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

const Signup = () => {
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
      <GlobalStyle />
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
          <Button className="dropdown-button">
            <Space className="mbti">
              {selectedMBTI || 'mbti'} <DownOutlined />
            </Space>
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
        <Link href="/login"><Button className="confirm" type="text">로그인</Button></Link>
        <Button className="confirm" type="text" onClick={handleSubmit}>
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