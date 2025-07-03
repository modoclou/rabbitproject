import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import AppLayout from '../components/AppLayout'; 
import KeywordForm from '../components/KeywordForm';

const Home = () => {
  return (
    <AppLayout>
      <KeywordForm />
    </AppLayout>
  );
};

export default Home;
