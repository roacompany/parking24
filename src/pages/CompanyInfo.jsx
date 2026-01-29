import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import SideDrawer from '../components/layout/SideDrawer';
import Footer from '../components/common/Footer';

const CompanyInfo = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="회사 소개 | PARKING 24"
        description="PARKING 24 회사 정보 및 서비스 소개"
        url="https://www.parking24.me/company-info"
      />
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="px-5 py-8">
        <h1 className="text-3xl font-bold mb-8">회사소개</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">PARKING 24</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              PARKING 24는 공항 주차 대행 서비스를 제공하는 플랫폼입니다. 
              고객님의 소중한 차량을 안전하게 보관하고, 편리한 공항 이용을 도와드립니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">회사 정보</h2>
            <div className="bg-gray-50 rounded-xl p-5 space-y-2 text-sm">
              <p><span className="font-semibold">상호:</span> 주식회사 파킹24</p>
              <p><span className="font-semibold">대표이사:</span> 홍길동</p>
              <p><span className="font-semibold">사업자등록번호:</span> 123-45-67890</p>
              <p><span className="font-semibold">주소:</span> 인천광역시 중구 공항로 272</p>
              <p><span className="font-semibold">대표전화:</span> 1234-5678</p>
              <p><span className="font-semibold">이메일:</span> support@parking24.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">서비스 특징</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-700">24시간 연중무휴 운영</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-700">안전한 실내/실외 주차장</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-700">무료 셔틀 서비스 제공</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-700">차량 세차 및 관리 서비스</span>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompanyInfo;