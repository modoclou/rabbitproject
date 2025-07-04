import React, { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Form, Input, Button, Dropdown, Space } from 'antd';
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

.keyword-input {
  font-size: 13px;
  background-color: #FFFFFF;
  border: 1px solid #FFFFFF;
  color: #black;
  border-radius: 25px;
  padding: 0 20px !important;
  height: 40px;
  min-width: 430px;
  font-family: 'Inter', system-ui;
}

.keyword-input:hover,
.keyword-input:focus,
.keyword-input-focused{
  box-shadow: none !important;
  border: 1px solid #FFFFFF !important;
}

.search-icon {
  color: #B5B5B5;
  transition: color 0.2s ease;
  cursor: pointer;
}

.search-icon:hover {
  color:rgb(139, 139, 139);
}
`;

const KeywordForm = () => {
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
    <span className="content" style={{maxWidth: '400px', display: 'block', margin: '0 0 50px 0'}}>시네마인에서 내가 원하는 필름을 찾아보세요.</span>
    <Form.Item name="keyword">
      <Input placeholder="키워드 입력"
        suffix={
          <Link href="/result" legacyBehavior>
            <a>
              <SearchOutlined
                className="search-icon" style={{ fontSize: '16px' }}
              />
            </a>
          </Link>
        }
        className="keyword-input"
      />
    </Form.Item>
    <div className="middle" style={{gap: '20px'}}>
      <Link href="/login" legacyBehavior><Button className="confirm" type="text">
        로그인
      </Button></Link>
      <Link href="/keywordresult" legacyBehavior>
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

export default KeywordForm;