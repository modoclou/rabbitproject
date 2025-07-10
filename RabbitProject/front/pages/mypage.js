import React from 'react';
import 'antd/dist/antd.css';
import AppLayout from '../components/AppLayout'; 
import MyPage from '../components/MyPage';

const mypage = () => {
  return (
    <AppLayout>
      <MyPage />
    </AppLayout>
  );
};

export default mypage;
