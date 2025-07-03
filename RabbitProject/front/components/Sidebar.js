import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const sidebarRef = useRef(null);

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
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          position: relative;
          transition: transform 0.3s ease;
        }

        .menu-item:hover {
          transform: translateX(20px);
        }

        .menu-label {
          color: #ededed;
          font-size: 1em;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .dot {
          width: 7px;
          height: 7px;
          background-color: #ededed;
          border-radius: 50%;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .menu-item:hover .menu-label {
          color: #CC30FE;
          text-shadow:
            0 0 5px rgba(204, 48, 254, 0.4),
            0 0 10px rgba(204, 48, 254, 0.4),
            0 0 15px rgba(204, 48, 254, 0.3);
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
          <div className="dot" />
          <Link href="/" legacyBehavior><span className="menu-label">MBTI</span></Link>
        </div>
        <div className="menu-item">
          <div className="dot" />
          <Link href="/keyword" legacyBehavior><span className="menu-label">키워드</span></Link>
        </div>
        <div className="menu-item">
          <div className="dot" />
          <Link href="/history" legacyBehavior><span className="menu-label">저장된 기록</span></Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
