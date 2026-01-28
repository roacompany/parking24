import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const links = [
    { label: '회사소개', path: '/company-info' },
    { label: '개인정보처리방침', path: '/privacy-policy' },
    { label: '서비스 이용약관', path: '/terms-of-service' },
    { label: '사업자 정보확인', path: '/business-info' },
  ];

  return (
    <footer className="bg-gray-100 py-8 px-5 mt-12">
      <div className="mb-4">
        <h3 className="font-bold text-lg">PARKING 24</h3>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-2 mb-6 text-sm text-gray-600">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={() => navigate(link.path)}
            className="hover:text-black"
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="text-xs text-gray-600 space-y-1">
        <p>PARKING24는 통신판매 중개자로서 통신판매의 당사자가 아니며 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.</p>
        <p className="mt-4">ⓒ PARKING 24 Co. Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;