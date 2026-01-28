import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 사이드 메뉴 (Drawer)
 * - 오른쪽에서 슬라이드로 나타남
 */
const SideDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: '홈', path: '/' },
    { label: '예약 조회', path: '/reservation-lookup' },
    { label: '이용 안내', path: '/usage-guide' },
    { label: '자주 묻는 질문', path: '/faq' },
    { label: '고객센터', path: '/customer-service' },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* 배경 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* 사이드 메뉴 */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-end p-5">
          <button
            onClick={onClose}
            className="text-2xl font-light"
            aria-label="메뉴 닫기"
          >
            ×
          </button>
        </div>

        {/* 메뉴 항목 */}
        <nav className="px-5">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleMenuClick(item.path)}
                  className="w-full text-left py-4 px-3 hover:bg-gray-100 rounded-lg text-lg"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;