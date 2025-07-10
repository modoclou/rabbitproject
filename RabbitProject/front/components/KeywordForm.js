import React, { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Form, Input, Button, Dropdown, Space } from 'antd';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Loader from './Loader';

const colorMap = {
  NT: '#BA62B9',
  NF: '#DDC143',
  ST: '#58A3A1',
  SF: '#6B8D4B',
  default: '#ffffff',
};

const MbtiColorText = ({ mbti }) => {
  let color = colorMap.default;
  if (mbti.includes('NT')) color = colorMap.NT;
  else if (mbti.includes('NF')) color = colorMap.NF;
  else if (mbti.includes('ST')) color = colorMap.ST;
  else if (mbti.includes('SF')) color = colorMap.SF;

  return (<h3 className="mbti-color" style={{ color }}>{mbti}</h3>);
};

const KeywordForm = () => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
  };

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
      <Loader isActive={loading} style={{ alignItems: 'center' }} />
    </div>
    <div className="middle">
      <h3 className="title">Welcome to<span className="colortitle">&nbsp;Cinemine</span></h3>
    </div>
    <span className="content-discription" style={{ display: 'block', margin: '0 0 50px 0'}}>시네마인에서 내가 원하는 필름을 찾아보세요.</span>
    <Form.Item name="keyword" style={{ marginBottom: '30px' }}>
      <Input placeholder="키워드 입력" style={{width: '430px'}}
        suffix={
          <Link href="/keywordresult" legacyBehavior>
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
      <Link href="/login" legacyBehavior><Button className="button-black" type="text">
        로그인
      </Button></Link>
      <Link href="/keywordresult" legacyBehavior>
      <Button className="button-black" type="text" onClick={handleClick}>
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