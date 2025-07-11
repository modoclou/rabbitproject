import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import AppLayout from '../components/AppLayout'; 
import MyPage from '../components/MyPage';
import History from '../components/History';

const mypage = () => {
  return (
    <>
      <AppLayout />
      <Col xs={24} md={24}>
      <MyPage />
      </Col>
      <History />
      </>
  );
};

export default mypage;
