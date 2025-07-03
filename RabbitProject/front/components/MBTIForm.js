import React, { useState, useEffect } from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import Loader from './Loader';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbit&family=Paprika&display=swap');

  body{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title{
    color: white;
    font-size: 45px;
    display: flex;
    justifyContent: center;
    alignItems: center;
    min-width: 505px;
    height: auto;
    font-family: "Paprika", system-ui;
  }
  
  .colortitle{
    background: linear-gradient(75deg, #b13bff 0%, #A021EA 30%, #9000FF 70%, #8f62ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .mbti{
    gap: 280px !important;
  }

  .content{
    color: white;
    font-size: 13px;
    text-align: center;
    align-items: center;
    font-famliy: "Orbit", system-ui;
  }

  .ant-btn-text {
  color: white;
  font-size: 12px;
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
  margin-bottom: 30px;
}

.middle{
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
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

const MBTIForm = () => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
  };

  return (
    <>
      <GlobalStyle />
      <div className="middle" style={{ marginBottom: '25px' }}>
        <Loader isActive={loading} style={{ alignItems: 'center' }} />
      </div>
      <div className="middle">
        <h3 className="title">Welcome to<span className="colortitle">&nbsp;Cinemine</span></h3>
      </div>
      <span className="content" style={{maxWidth: '400px', display: 'block', margin: '0 0 70px 0'}}>mbti를 기반으로 당신의 성격과 꼭 맞는 영화를 AI가 선별해 드려요. 시네마인에서 아직 만나지 못한 취향과, 숨어 있는 취향을 찾아보세요.</span>
      <Dropdown menu={menuProps}>
        <Button className="dropdown-button">
          <Space className="mbti">
            mbti 선택...
            <DownOutlined />
          </Space>
        </Button>
    </Dropdown>
    <div className="middle" style={{gap: '20px'}}>
      <Link href="/login" legacyBehavior><Button type="text">
        로그인
      </Button></Link>
      <Link href="/result" legacyBehavior><Button type="text" onClick={handleClick}>
        결과 보기
      </Button></Link>
    </div>
    </>
  );
};

export default MBTIForm;