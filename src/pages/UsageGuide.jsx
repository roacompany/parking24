import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import BreadcrumbSchema from '../components/common/BreadcrumbSchema';
import Header from '../components/common/Header';
import SideDrawer from '../components/layout/SideDrawer';
import Footer from '../components/common/Footer';

/**
 * 이용 안내 페이지
 */
const UsageGuide = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="이용 안내 | PARKING 24"
        description="PARKING 24 주차대행 서비스 예약부터 출차까지 이용 방법 안내"
        url="https://www.parking24.me/usage-guide"
      />
      <BreadcrumbSchema items={[
        { name: '홈', url: '/' },
        { name: '이용 안내', url: '/usage-guide' }
      ]} />
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="px-5 py-8">
        <h1 className="text-3xl font-bold mb-8">이용 안내</h1>

        {/* 예약 방법 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">예약 방법</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. 공항 및 날짜 선택</h3>
              <p className="text-gray-600 text-sm">
                이용하실 공항과 입출차 날짜 및 시간을 선택해주세요.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. 주차 플랜 선택</h3>
              <p className="text-gray-600 text-sm">
                Standard, Pro, Exclusive 중 원하시는 플랜을 선택하세요. Pro 플랜이 가장 인기 있습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. 정보 입력</h3>
              <p className="text-gray-600 text-sm">
                차량번호, 이름, 연락처를 입력하고 예약을 완료하세요.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4. 예약 확정</h3>
              <p className="text-gray-600 text-sm">
                예약이 완료되는 즉시 확정되어 편리해요.
              </p>
            </div>
          </div>
        </section>

        {/* 이용 절차 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">이용 절차</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded">
              <h3 className="font-semibold text-blue-900 mb-2">출발 시 (입차)</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 예약 시간 30분 전까지 도착</li>
                <li>• 지정주차장에 도착하면 배정기사가 대기</li>
                <li>• 키를 맡기고 예약정보 확인</li>
                <li>• 공항으로 이동</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded">
              <h3 className="font-semibold text-green-900 mb-2">도착 시 (출차)</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• 착륙 직후 딜리버리 드라이버에게 연락</li>
                <li>• 지정 장소에서 차량 인수</li>
                <li>• 차량 상태 확인</li>
                <li>• 현장 결제 후 출발</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 주차 플랜 비교 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">주차 플랜 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">구분</th>
                  <th className="border border-gray-300 px-4 py-3">Standard</th>
                  <th className="border border-gray-300 px-4 py-3 bg-blue-50">Pro</th>
                  <th className="border border-gray-300 px-4 py-3">Exclusive</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">가격 (1일)</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">10,000원</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-blue-50">15,000원</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">30,000원</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">주차 위치</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">실외</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-blue-50">실내 우선</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">실내 우선</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">차량 덮개</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">-</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-blue-50">✓</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">세차</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">-</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-blue-50">-</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">워터프리</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">핸들살균</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">-</td>
                  <td className="border border-gray-300 px-4 py-3 text-center bg-blue-50">-</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 결제 안내 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">결제 안내</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <p className="font-semibold mb-3">현장 결제 시스템</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• 모든 결제는 출차 시 현장에서 진행됩니다</li>
              <li>• 신용카드, 체크카드, 현금 결제 가능</li>
              <li>• 예약 시 결제 금액이 확정됩니다</li>
              <li>• 현금영수증 및 세금계산서 발행 가능</li>
            </ul>
          </div>
        </section>

        {/* 취소 및 환불 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">취소 및 환불</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-green-700 mb-1">입차 1일 전까지</h3>
              <p className="text-sm text-gray-600">무료 취소 (수수료 없음)</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-yellow-700 mb-1">입차 당일</h3>
              <p className="text-sm text-gray-600">취소 불가</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                * 취소는 고객센터(010-9018-8885)로 연락 주시거나 예약 조회 페이지에서 가능합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 주의사항 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">주의사항</h2>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <ul className="text-sm text-red-800 space-y-2">
              <li>• 공항이 혼잡할 수 있어 시간여유를 갖고 주차장에 도착해주세요</li>
              <li>• 차량 내 귀중품은 비워 둔 상태에서 차량을 드라이버에게 전달해주세요</li>
              <li>• 차량 키는 반드시 드라이버에게 전달해주셔야 해요</li>
              <li>• 예약번호를 분실하지 않도록 주의하세요</li>
              <li>• 차량 손상 발견 시 즉시 신고해주세요</li>
            </ul>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default UsageGuide;