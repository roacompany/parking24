import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 헤더 컴포넌트
 * - 로고 클릭 시 홈으로 이동
 * - 햄버거 메뉴 버튼
 */
const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-white z-50 border-b border-gray-200">
      <div className="flex items-center justify-between px-5 py-4">
        {/* 로고 */}
        <h1 
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          PARKING 24
        </h1>

        {/* 햄버거 메뉴 버튼 */}
        <button
          onClick={onMenuClick}
          className="flex flex-col gap-1.5 w-8 h-8 justify-center items-end"
          aria-label="메뉴 열기"
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;