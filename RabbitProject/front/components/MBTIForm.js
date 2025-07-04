import React, { useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { createGlobalStyle } from 'styled-components';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Loader from './Loader';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Orbit&family=Paprika&display=swap');

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
    <span className="content" style={{maxWidth: '400px', display: 'block', margin: '0 0 50px 0'}}>mbti를 기반으로 당신의 성격과 꼭 맞는 영화를 AI가 선별해 드려요.<br/>시네마인에서 아직 만나지 못한 취향과, 숨어 있는 취향을 찾아보세요.</span>
    <Dropdown menu={menuProps}>
      <Button className="dropdown-button">
        <Space className="mbti">
          mbti 선택... <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
    <div className="middle" style={{gap: '20px'}}>
      <Link href="/login" legacyBehavior><Button className="confirm" type="text">
        로그인
      </Button></Link>
      <Link href="/mbtiresult" legacyBehavior>
      <Button className="confirm" type="text" onClick={handleClick}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          결과 보기
          <Icon icon="bitcoin-icons:arrow-right-filled" width="12" height="12" style={{position: 'relative', bottom: '0.05em'}} />
        </span>
      </Button>
    </Link>
    </div>
    </>
  );
};

export default MBTIForm;