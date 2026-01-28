import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { formatDate, formatTime } from '../utils/dateUtils';
import { formatPrice } from '../utils/priceUtils';

const ReservationComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { reservation } = location.state || {};

  useEffect(() => {
    if (!reservation) {
      navigate('/');
    }
  }, [reservation, navigate]);

  if (!reservation) {
    return null;
  }

  const startDateTime = reservation.startDateTime ? new Date(reservation.startDateTime) : null;
  const endDateTime = reservation.endDateTime ? new Date(reservation.endDateTime) : null;

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuClick={() => {}} />

      <div className="px-5 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">예약이 완료되었습니다</h1>
          <p className="text-sm text-gray-600">예약번호를 확인하시고 저장해주세요</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 space-y-6">
          <div>
            <h2 className="font-bold text-lg mb-4">예약 정보</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">예약번호</span>
                <span className="text-sm font-bold">{reservation.reservationNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">예약자</span>
                <span className="text-sm font-medium">{reservation.customerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">연락처</span>
                <span className="text-sm font-medium">{reservation.customerPhone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">차량번호</span>
                <span className="text-sm font-medium">{reservation.vehicleNumber}</span>
              </div>
              {reservation.vehicleModel && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">차량 모델</span>
                  <span className="text-sm font-medium">{reservation.vehicleModel}</span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="font-bold text-lg mb-4">주차 정보</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">공항</span>
                <span className="text-sm font-medium">{reservation.airportName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">이용권</span>
                <span className="text-sm font-medium">{reservation.planName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">입차</span>
                <div className="text-right">
                  {startDateTime ? (
                    <>
                      <p className="text-sm font-medium">{formatDate(startDateTime)}</p>
                      <p className="text-xs text-gray-600">{formatTime(startDateTime)}</p>
                    </>
                  ) : (
                    <p className="text-sm">-</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">출차</span>
                <div className="text-right">
                  {endDateTime ? (
                    <>
                      <p className="text-sm font-medium">{formatDate(endDateTime)}</p>
                      <p className="text-xs text-gray-600">{formatTime(endDateTime)}</p>
                    </>
                  ) : (
                    <p className="text-sm">-</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">총 일수</span>
                <span className="text-sm font-medium">{reservation.days}일</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">총 금액</span>
              <span className="text-2xl font-bold">{formatPrice(reservation.totalPrice)}</span>
            </div>
            <p className="text-xs text-gray-600">출차 시 현장 결제</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
          <h3 className="font-bold text-sm mb-2">이용 안내</h3>
          <ul className="space-y-1 text-xs text-gray-700">
            <li>• 예약 시간에 맞춰 공항에 도착해주세요</li>
            <li>• 입차 1일 전까지 무료 취소가 가능합니다</li>
            <li>• 귀중품은 반드시 휴대하시기 바랍니다</li>
            <li>• 차량 키는 발렛 직원에게 전달해주세요</li>
          </ul>
        </div>

        <div className="space-y-3 mt-8">
          <Button onClick={() => navigate('/reservation-lookup')}>
            예약 조회
          </Button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-4 border border-gray-300 rounded-lg text-base font-semibold hover:bg-gray-50"
          >
            홈으로
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReservationComplete;