import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import SideDrawer from '../components/layout/SideDrawer';
import Footer from '../components/common/Footer';

const BusinessInfo = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="사업자 정보 | PARKING 24"
        description="PARKING 24 사업자 정보 공개"
        url="https://www.parking24.me/business-info"
      />
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="px-5 py-8">
        <h1 className="text-3xl font-bold mb-8">사업자 정보</h1>

        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="font-bold text-lg mb-3">사업자 등록 정보</h2>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="w-32 text-gray-600">상호명</span>
                <span className="font-medium">주식회사 파킹24</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600">대표자</span>
                <span className="font-medium">홍길동</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600">사업자등록번호</span>
                <span className="font-medium">123-45-67890</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600">통신판매업 신고</span>
                <span className="font-medium">제2025-인천중구-0001호</span>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h2 className="font-bold text-lg mb-3">사업장 정보</h2>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="w-32 text-gray-600">주소</span>
                <span className="font-medium">인천광역시 중구 공항로 272</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600">대표전화</span>
                <span className="font-medium">1234-5678</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600">팩스</span>
                <span className="font-medium">032-1234-5678</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-600">이메일</span>
                <span className="font-medium">support@parking24.com</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-3">호스팅 서비스</h2>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="w-32 text-gray-600">제공자</span>
                <span className="font-medium">Google Firebase</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          
            href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-black text-white text-center py-3 rounded-lg font-semibold"
          
            사업자 정보 확인
          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BusinessInfo;