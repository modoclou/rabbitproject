import React from 'react';

const Loader = ({ isActive }) => {
  return (
    <>
      <style>{`
        .loader {
          width: 45px;
          aspect-ratio: 1;
          display: grid;
        }

        .loader::before,
        .loader::after {    
          content: "";
          grid-area: 1/1;
          --c: no-repeat radial-gradient(farthest-side,#25b09b 92%,#0000);
          background: 
            var(--c) 50% 0, 
            var(--c) 50% 100%, 
            var(--c) 100% 50%, 
            var(--c) 0 50%;
          background-size: 10px 10px;
        }

        .loader.active::before,
        .loader.active::after {
          animation: l12 1s infinite;
        }

        .loader.active::before {
          margin: 2px;
          filter: hue-rotate(45deg);
          background-size: 8px 8px;
          animation-timing-function: linear;
        }

        @keyframes l12 { 
          100% { transform: rotate(0.5turn); }
        }
      `}</style>
      <div className={`loader ${isActive ? 'active' : ''}`}></div>
    </>
  );
};

export default Loader;
