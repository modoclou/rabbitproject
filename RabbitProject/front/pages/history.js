import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import AppLayout from '../components/AppLayout'; 
import History from '../components/History'; 

const Home = () => {
  return (
    <AppLayout>
      <History />
    </AppLayout>
  );
};

export default Home;
