import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import 'antd/dist/antd.css';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Button, Dropdown } from 'antd';
import AppLayout from '../components/AppLayout';
import Loader from '../components/Loader';
import axios from 'axios';
import { useRouter } from 'next/router';
import { MessageContext } from '../components/MessageProvider';

const mbtiList = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

const Findpass = () => {
  const router = useRouter();
  const { showCustomMessage } = useContext(MessageContext);

  const [selectedMBTI, setSelectedMBTI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleMenuClick = ({ key }) => {
    const mbti = mbtiList[parseInt(key, 10) - 1];
    setSelectedMBTI(mbti);
  };

  const menuItems = mbtiList.map((mbti, index) => ({
    label: mbti,
    key: `${index + 1}`,
  }));

  // 메일 전송 API 호출 및 상태관리
  const handleSendMail = async () => {
    try {
      const values = await form.validateFields();
      if (!selectedMBTI) {
        showCustomMessage('MBTI를 선택해주세요.');
        return;
      }
      setLoading(true);

      const payload = {
        username: values.email,
        nickname: values.username,
        mbti: selectedMBTI,
      };

      await axios.post('/movies/findpass', payload);

      showCustomMessage('임시 비밀번호를 이메일로 전송했습니다.');
    } catch (error) {
      console.error('메일 전송 실패:', error);
      showCustomMessage('메일 전송에 실패했습니다. 정보를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <head>
        <style>{`
          body {
            -webkit-align-items: center;
          }
        `}</style>
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

        <Form.Item
          name="username"
          rules={[{ required: true, message: '유저명을 입력해주세요.' }]}
        >
          <Input placeholder="유저명" className="input-black" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
        >
          <Input placeholder="아이디(이메일)" className="input-black" />
        </Form.Item>
      </Form>

      <div className="middle" style={{ marginTop: '25px', gap: '20px' }}>
        <Button className="button-confirm-white" type="text" onClick={handleSendMail}>
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
      </div>
    </>
  );
};

export default Findpass;
