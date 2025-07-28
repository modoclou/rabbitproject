import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    nickname: '',
  });

  // 클라이언트에서 localStorage 읽어 초기화
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const nickname = localStorage.getItem('nickname');
      if (token && nickname) {
        setAuthState({ isLoggedIn: true, nickname });
      }
    }
  }, []);

  const login = (token, nickname) => {
    localStorage.setItem('token', token);
    localStorage.setItem('nickname', nickname);
    setAuthState({ isLoggedIn: true, nickname });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    setAuthState({ isLoggedIn: false, nickname: '' });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
