import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout'; 
import 'antd/dist/antd.css';
import KeywordResult from '../components/KeywordResult';

const Home = () => {
  return (
    <AppLayout>
      <KeywordResult />
    </AppLayout>
  );
};

export default Home;
