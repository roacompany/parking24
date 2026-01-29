import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import SideDrawer from '../components/layout/SideDrawer';
import Footer from '../components/common/Footer';

const TermsOfService = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="이용약관 | PARKING 24"
        description="PARKING 24 서비스 이용약관"
        url="https://www.parking24.me/terms-of-service"
      />
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="px-5 py-8">
        <h1 className="text-3xl font-bold mb-8">서비스 이용약관</h1>

        <div className="space-y-6 text-sm text-gray-700">
          <section>
            <h2 className="text-lg font-bold mb-3">제1조 (목적)</h2>
            <p className="leading-relaxed">
              이 약관은 PARKING 24가 제공하는 공항 주차 대행 서비스의 이용 조건 및 절차,
              이용자와 회사의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">제2조 (서비스의 내용)</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>공항 주차 대행 서비스</li>
              <li>차량 보관 서비스</li>
              <li>공항 셔틀 서비스</li>
              <li>부가 서비스 (세차, 정비 등)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">제3조 (예약 및 이용)</h2>
            <p className="mb-2">1. 예약은 웹사이트를 통해 진행됩니다.</p>
            <p className="mb-2">2. 예약 즉시 확정되며, 입차 1일 전까지 무료 취소가 가능합니다.</p>
            <p>3. 결제는 출차 시 현장에서 진행됩니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">제4조 (이용자의 의무)</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>정확한 정보 제공</li>
              <li>예약 시간 준수</li>
              <li>차량 내 귀중품 미보관</li>
              <li>차량 키 제공</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">제5조 (회사의 의무)</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>안전한 차량 보관</li>
              <li>예약 서비스 제공</li>
              <li>개인정보 보호</li>
              <li>서비스 품질 유지</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">제6조 (면책사항)</h2>
            <p className="leading-relaxed">
              회사는 천재지변, 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.
              차량 내 보관된 귀중품의 분실에 대해서는 책임지지 않습니다.
            </p>
          </section>

          <p className="mt-8 text-xs text-gray-600">
            시행일자: 2025년 1월 1일
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;