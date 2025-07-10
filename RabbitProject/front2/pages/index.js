import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import AppLayout from '../components/AppLayout'; 
import MBTIForm from '../components/MBTIForm';

const Home = () => {
  return (
    <AppLayout>
      <MBTIForm />
    </AppLayout>
  );
};

export default Home;
