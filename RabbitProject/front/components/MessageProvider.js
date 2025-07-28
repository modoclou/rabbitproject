import React, { createContext, useState, useEffect } from 'react';
import { message } from 'antd';

export const MessageContext = createContext(null);

const MessageProvider = ({ children }) => {
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

  useEffect(() => {
    message.config({
      maxCount: 7,
      duration: 3,
    });
  }, []);

  const showCustomMessage = (content) => {
  const newKey = `msg_${Date.now()}`;

  setMessageKeys((prevKeys) => {
    let updatedKeys = [...prevKeys];
    if (updatedKeys.length >= 7) {
      const [oldestKey, ...rest] = updatedKeys;
      message.destroy(oldestKey);
      updatedKeys = [...rest];
    }

    message.open({
      key: newKey,
      content,
      icon: <div style={reel}></div>,
      duration: 3,
      className: 'custom-message',
    });

    return [...updatedKeys, newKey];
  });
};


  return (
    <MessageContext.Provider value={{ showCustomMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
