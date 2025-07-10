import React, { useState } from 'react';
import Link from 'next/link';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, message } from 'antd';
import { Icon } from '@iconify/react';
import Loader from './Loader';
import { useRouter } from 'next/router';

const mbtiList = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

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

const MBTIForm = () => {
  const [selectedMBTI, setSelectedMBTI] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleMenuClick = ({ key }) => {
    const mbti = mbtiList[parseInt(key) - 1];
    setSelectedMBTI(mbti);
    message.success(`${mbti} 선택됨`);
  };

  const handleResultClick = () => {
    if (!selectedMBTI) {
      message.warning('MBTI를 먼저 선택해주세요.');
      return;
    }
    setLoading(true);
    router.push({
      pathname: '/mbtiresult',
      query: { mbti: selectedMBTI },
    });
  };

  const menuItems = mbtiList.map((mbti, index) => ({
    label: mbti,
    key: `${index + 1}`,
  }));

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
    <span className="content-discription" >mbti를 기반으로 당신의 성격과 꼭 맞는 영화를 AI가 선별해 드려요.<br/>시네마인에서 아직 만나지 못한 취향과, 숨어 있는 취향을 찾아보세요.</span>
    <div className="middle"  style={{minWidth: '430px', maxWidth: 'auto'}}>
      <Dropdown menu={{ items: menuItems, onClick: handleMenuClick }}>
        <Button className="dropdown-button" style={{ width: '430px' }}>
          <Space className="mbti" style={{ justifyContent: 'space-between', width: '98%' }}>
            <span>{selectedMBTI || 'mbti 선택...'}</span>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

    </div>
    <div className="middle" style={{gap: '20px'}}>
      <Link href="/login" legacyBehavior>
        <Button className="button-black" type="text">
          로그인
        </Button>
      </Link>
      <Button className="button-black" type="text" onClick={handleResultClick}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          결과 보기
          <Icon icon="bitcoin-icons:arrow-right-filled" width="12" height="12" style={{position: 'relative', bottom: '0.05em'}} />
        </span>
      </Button>
    </div>
    </>
  );
};

export default MBTIForm;
