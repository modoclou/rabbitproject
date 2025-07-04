import React from 'react';

const Wavebox = () => {
  return (
    <>
      <style>{`
        .wave-container {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 280px;
          z-index: -99;
          pointer-events: none;
          overflow: hidden;
        }

        .box {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .box:before,
        .box-inner {
          position: absolute;
          content: '';
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 0;
          background-repeat: repeat-x;
          background-size: 1600px 70%;
          background-position: 0 130%, -50px 130%, 500px 130%;
          animation: 35s waves linear infinite forwards;
        }

        .box:before {
          background-image:
            url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='198'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0' y2='100%25'%3e%3cstop stop-color='%237C00FE' stop-opacity='0.7' offset='0%25'/%3e%3cstop stop-color='%237C00FE' stop-opacity='0.7' offset='100%25'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath fill='url(%23a)' fill-rule='evenodd' d='M0 121C311 121 410 0 811 0c400 0 500 121 789 121v77H0V121z'/%3e%3c/svg%3e"),
            url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='198'%3e%3cdefs%3e%3clinearGradient id='b' x1='50%25' x2='50%25' y1='0' y2='100%25'%3e%3cstop stop-color='%238B5DFF' stop-opacity='0.7' offset='0%25'/%3e%3cstop stop-color='%238B5DFF' stop-opacity='0.7' offset='100%25'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath fill='url(%23b)' fill-rule='evenodd' d='M0 121C311 121 410 0 811 0c400 0 500 121 789 121v77H0V121z'/%3e%3c/svg%3e"),
            url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='198'%3e%3cdefs%3e%3clinearGradient id='c' x1='50%25' x2='50%25' y1='0' y2='100%25'%3e%3cstop stop-color='%238B5DFF' stop-opacity='0.7' offset='0%25'/%3e%3cstop stop-color='%238B5DFF' stop-opacity='0.7' offset='100%25'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath fill='url(%23c)' fill-rule='evenodd' d='M0 121C311 121 410 0 811 0c400 0 500 121 789 121v77H0V121z'/%3e%3c/svg%3e");
        }

        @keyframes waves {
          to {
            background-position: 1600px 130%, 3150px 130%, 5300px 130%;
          }
        }
      `}</style>
      <div className="wave-container">
        <div className="box">
          <div className="box-inner"></div>
        </div>
      </div>
    </>
  );
};

export default Wavebox;
