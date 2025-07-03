import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { Row, Col } from 'antd';
import { createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';
import Wavebox from './Wavebox';
import Sidebar from './Sidebar';
import MBTIForm from './MBTIForm';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Orbit&family=Paprika&display=swap');

  .custom-message .ant-message-notice-content {
    border-radius: 25px !important;
  }

  .custom-message .ant-message-notice-content .ant-message-custom-content {
    margin-bottom: 0.2em !important; /* 0.2em 위로 올리기 */
  }
    
  body {
    background-color: #1C1C1C;
  }
`;

const AppLayout = ({ children }) => {
  const [messageKeys, setMessageKeys] = useState([]);

  const reel = {
    display: 'inline-block',
    color: '#7C00FE',
    width: '20px',
    height: '20px',
    marginRight: '5px',
    position: 'relative',
    top: '0.2em',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27%3E%3Cpath fill=%27%237C00FE%27 fill-rule=%27evenodd%27 d=%27M2 12c0 5.523 4.477 10 10 10h9.25a.75.75 0 0 0 0-1.5h-3.98A9.99 9.99 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12m10-3a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m0 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-4.5-7.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M18 12a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0%27 clip-rule=%27evenodd%27/%3E%3C/svg%3E')",
  };

  const arrow = {
    display: 'inline-block',
    color: '#000000',
    width: '20px',
    height: '20px',
    marginRight: '5px',
    position: 'relative',
    top: '0.2em',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M13.483 4.47a.75.75 0 0 1 1.06 0l6.988 7a.75.75 0 0 1 0 1.06l-6.988 7a.75.75 0 0 1-1.061-1.06l5.709-5.719L3 12.762a.75.75 0 0 1-.002-1.5l16.194-.01l-5.711-5.722a.75.75 0 0 1 0-1.06' clip-rule='evenodd'/%3E%3C/svg%3E')"
  };

  useEffect(() => {
    message.config({
      maxCount: 7,
      duration: 3,
    });
  }, []);

  const showCustomMessage = () => {
  const newKey = `msg_${Date.now()}`;

  setMessageKeys((prevKeys) => {
    let updatedKeys = [...prevKeys];

    if (updatedKeys.length >= 7) {
      const [oldestKey, ...rest] = updatedKeys;
      message.destroy(oldestKey);
      updatedKeys = [...rest];
    }

    const nextKeys = [...updatedKeys, newKey];
    setMessageKeys(nextKeys);

    setTimeout(() => {
      message.open({
        key: newKey,
        content: '이건 커스텀 아이콘을 가진 메시지예요!',
        icon: <div style={reel}></div>,
        duration: 3,
        className: 'custom-message',
      });
    }, updatedKeys.length < 7 ? 0 : 300);
    return nextKeys;
  });
};

  return (
    <>
      <Row gutter={[0, 0]}>
        <Col xs={24} md={1}></Col>
        <Col xs={24} md={1}><Sidebar /></Col>
        <Col xs={24} md={20}>
          <GlobalStyle />
          <Wavebox />
          {children}
          <Button
            type="primary"
            style={{ justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}
            onClick={showCustomMessage}>
            커스텀 메시지 테스트용 버튼
          </Button>
        </Col>
        <Col xs={24} md={2}></Col>
      </Row>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;