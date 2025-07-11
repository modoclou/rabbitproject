import React, { useEffect, useContext } from 'react';
import 'antd/dist/antd.css';
import AppLayout from '../components/AppLayout'; 
import MBTIForm from '../components/MBTIForm';
import { MessageContext } from '../components/MessageProvider';

const Home = () => {
const { showCustomMessage } = useContext(MessageContext);

  useEffect(() => {
    const logoutSuccess = localStorage.getItem('logoutSuccess');
    if (logoutSuccess === 'true') {
      showCustomMessage('로그아웃 되었습니다.');
      localStorage.removeItem('logoutSuccess');
    }
  }, []);
  
  return (
    <AppLayout>
      <MBTIForm />
    </AppLayout>
  );
};

export default Home;
