import React, { useEffect, useRef, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MessageContext } from '../components/MessageProvider';

const Sidebar = () => {
  const router = useRouter();
  const sidebarRef = useRef(null);
  const [nickname, setNickname] = useState('');
  const { showCustomMessage } = useContext(MessageContext);

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current) {
        const scrollY = window.scrollY;
        sidebarRef.current.style.transform = `translateY(calc(-50% + ${scrollY * 0.2}px))`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedNickname = localStorage.getItem('nickname');
      setNickname(storedNickname || '');
    };
    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    router.push('/').then(() => {
      router.reload();
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

        .sidebar-container {
          position: fixed;
          top: 50%;
          left: 0;
          padding-left: 2em;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          z-index: 1000;
          transition: transform 0.2s ease-out;
        }

        .menu-item {
          font-family: "Inter", sans-serif;
          cursor: pointer;
          position: relative;
        }

        .menu-content-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-left: 0;
          transition: padding-left 0.3s ease;
        }

        .menu-item:hover .menu-content-wrapper {
          padding-left: 15px;
        }

        .menu-label {
          color: #ededed;
          font-size: 1em;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .menu-item:hover .menu-label {
          color: #CC30FE;
          text-shadow:
            0 0 5px rgba(204, 48, 254, 0.4),
            0 0 10px rgba(204, 48, 254, 0.4),
            0 0 15px rgba(204, 48, 254, 0.3);
        }

        .dot {
          width: 7px;
          height: 7px;
          background-color: #ededed;
          border-radius: 50%;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .menu-item:hover .dot {
          background-color: #CC30FE;
          box-shadow:
            0 0 5px rgba(204, 48, 254, 0.6),
            0 0 10px rgba(204, 48, 254, 0.4),
            0 0 15px rgba(204, 48, 254, 0.3);
        }
      `}</style>
      <div className="sidebar-container" ref={sidebarRef}>
        <div className="menu-item">
          <Link href="/" legacyBehavior>
            <div className="menu-content-wrapper">
              <div className="dot" />
              <span className="menu-label">MBTI</span>
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link href="/keyword" legacyBehavior>
            <div className="menu-content-wrapper">
              <div className="dot" />
              <span className="menu-label">키워드</span>
            </div>
          </Link>
        </div>
        {nickname && (
          <>
            <div className="menu-item">
              <Link href="/mypage" legacyBehavior>
                <div className="menu-content-wrapper">
                  <div className="dot" />
                  <span className="menu-label">{nickname}</span>
                </div>
              </Link>
            </div>
            <div className="menu-item" onClick={handleLogout}>
              <Link href="/" legacyBehavior>
                <div className="menu-content-wrapper">
                  <div className="dot" />
                  <span className="menu-label">로그아웃</span>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
