import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { Icon } from '@iconify/react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const mbtiList = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

function ResetPassword() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [mbti, setMbti] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('/reset-password', {
        username,
        mbti,
        age,
      });
      setMessage(res.data.message || '메일이 발송되었습니다.');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage('서버 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const menuItems = mbtiList.map((item, index) => ({
    key: index.toString(),
    label: item,
  }));

  const handleMenuClick = ({ key }) => {
    setMbti(mbtiList[parseInt(key, 10)]);
  };

  return (
    <>
      <head>
        <style>{`body{-webkit-align-items: center;}`}</style>
      </head>

      <div className="middle" style={{ marginBottom: '25px' }}>
        <Loader isActive={loading} />
      </div>
      <div className="middle">
        <h3 className="menu-title-pass">비밀번호 재설정</h3>
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
          gap: '15px',
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
        >
          <Input
            className="input-black"
            type="email"
            placeholder="이메일"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="mbti"
          rules={[{ required: true, message: 'MBTI를 선택해주세요.' }]}
        >
          <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }}>
            <Button className="dropdown-button black" style={{ marginBottom: '0px', width: '100%', textAlign: 'left' }}>
              {mbti || 'mbti 선택'}
              <DownOutlined style={{ float: 'right', marginTop: '4px' }} />
            </Button>
          </Dropdown>
        </Form.Item>

        {/* <Form.Item
          name="age"
          rules={[{ required: true, message: '나이를 입력해주세요.' }]}
        >
          <Input
            className="input-black"
            type="text"
            placeholder="나이"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Item> */}
      </Form>
      {message && (
      <p style={{ color: '#ff4d4f', whiteSpace: 'pre-wrap', textAlign: 'center', marginTop: '10px' }}>
        {message}
      </p>
    )}

      <div className="middle" style={{ marginTop: '25px', gap: '20px' }}>
        <Button
          type="text"
          loading={loading}
          onClick={handleSubmit}
          className="button-confirm-white"
          style={{ width: '100%' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            임시 번호 발급
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
}

export default ResetPassword;
