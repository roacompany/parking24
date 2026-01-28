import React, { useState } from 'react';
import Header from '../components/common/Header';
import SideDrawer from '../components/layout/SideDrawer';
import Footer from '../components/common/Footer';

const PrivacyPolicy = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="px-5 py-8">
        <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>

        <div className="space-y-6 text-sm text-gray-700">
          <section>
            <h2 className="text-lg font-bold mb-3">제1조 (목적)</h2>
            <p className="leading-relaxed">
              PARKING 24는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」을 준수하고 있습니다.
              본 방침은 회사가 제공하는 서비스 이용과 관련하여 이용자의 개인정보가 어떻게 수집, 이용, 보관되는지 알려드립니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">제2조 (수집하는 개인정보의 항목)</h2>
            <p className="mb-2">회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>이름, 연락처</li>
              <li>차량번호</li>
              <li>예약 날짜 및 시간</li>
              <li>결제 정보 (현장 결제)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">제3조 (개인정보의 이용 목적)</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>주차 예약 서비스 제공</li>
              <li>고객 상담 및 불만 처리</li>
              <li>서비스 개선 및 통계 분석</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">제4조 (개인정보의 보유 및 이용 기간)</h2>
            <p className="leading-relaxed">
              회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
              다만, 관계 법령에 의하여 보존할 필요가 있는 경우 법령이 정한 기간 동안 보관합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">제5조 (문의)</h2>
            <p className="leading-relaxed">
              개인정보 처리에 관한 문의사항은 고객센터(1234-5678) 또는 이메일(support@parking24.com)로 연락 주시기 바랍니다.
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

export default PrivacyPolicy;