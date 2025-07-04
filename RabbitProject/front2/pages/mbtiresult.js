import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout'; 
import 'antd/dist/antd.css';   // 공통css
import MBTIResult from '../components/MBTIResult';

const Home = () => {
  return (
    <AppLayout>
      <MBTIResult />
    </AppLayout>
  );
};

export default Home;
