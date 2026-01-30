import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { differenceInDays } from 'date-fns';
import SEO from '../components/common/SEO';
import BreadcrumbSchema from '../components/common/BreadcrumbSchema';
import Header from '../components/common/Header';
import SideDrawer from '../components/layout/SideDrawer';
import Footer from '../components/common/Footer';
import { formatDate, formatTime } from '../utils/dateUtils';
import { formatPrice } from '../utils/priceUtils';

const ReservationLookup = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVehicleNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setVehicleNumber(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhoneNumber(value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setReservations([]);

    if (!vehicleNumber.trim() || !phoneNumber.trim()) {
      setError('차량번호와 연락처를 모두 입력해주세요');
      return;
    }

    setLoading(true);

    try {
      const q = query(
        collection(db, 'reservations'),
        where('vehicleNumber', '==', vehicleNumber),
        where('customerPhone', '==', phoneNumber)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError('예약 정보를 찾을 수 없습니다');
      } else {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setReservations(data);
      }
    } catch (err) {
      console.error('조회 실패:', err);
      setError('조회 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  const canModifyReservation = (reservation) => {
    const startDateTime = reservation.startDateTime ? new Date(reservation.startDateTime) : null;
    if (!startDateTime) return false;
    
    const today = new Date();
    const daysUntilStart = differenceInDays(startDateTime, today);
    return daysUntilStart >= 1 && reservation.status === 'confirmed';
  };

  const handleCancel = async (reservationId) => {
    if (!window.confirm('예약을 취소하시겠습니까?')) return;

    try {
      await updateDoc(doc(db, 'reservations', reservationId), {
        status: 'cancelled'
      });
      alert('예약이 취소되었습니다');
      handleSearch({ preventDefault: () => {} });
    } catch (error) {
      console.error('취소 실패:', error);
      alert('취소에 실패했습니다');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="내 예약 조회 - 차량번호로 3초 만에 확인 | PARKING 24"
        description="차량번호와 연락처만 입력하면 예약 내역 즉시 확인. 예약 변경·취소도 간편하게. 지금 바로 조회해보세요."
        url="https://www.parking24.me/reservation-lookup"
      />
      <BreadcrumbSchema items={[
        { name: '홈', url: '/' },
        { name: '예약 조회', url: '/reservation-lookup' }
      ]} />
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="px-5 py-8">
        <h1 className="text-3xl font-bold mb-8">예약 조회</h1>

        <form onSubmit={handleSearch} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">차량번호</label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={handleVehicleNumberChange}
              placeholder="12가3456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">연락처</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="01012345678"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading ? '조회 중...' : '조회하기'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {reservations.map(reservation => {
          const startDateTime = reservation.startDateTime ? new Date(reservation.startDateTime) : null;
          const endDateTime = reservation.endDateTime ? new Date(reservation.endDateTime) : null;

          return (
            <div key={reservation.id} className="bg-gray-50 rounded-xl p-6 space-y-6 mb-4">
              <div>
                <h2 className="font-bold text-lg mb-4">예약 정보</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">예약번호</span>
                    <span className="font-bold">{reservation.reservationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">예약자</span>
                    <span className="font-medium">{reservation.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">연락처</span>
                    <span className="font-medium">{reservation.customerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">차량번호</span>
                    <span className="font-medium">{reservation.vehicleNumber}</span>
                  </div>
                  {reservation.vehicleModel && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">차량 모델</span>
                      <span className="font-medium">{reservation.vehicleModel}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="font-bold text-lg mb-4">주차 정보</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">공항</span>
                    <span className="font-medium">{reservation.airportName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">플랜</span>
                    <span className="font-medium">{reservation.planName}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600">입차</span>
                    <div className="text-right">
                      {startDateTime ? (
                        <>
                          <p className="font-medium">{formatDate(startDateTime)}</p>
                          <p className="text-xs text-gray-600">{formatTime(startDateTime)}</p>
                        </>
                      ) : (
                        <p>-</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600">출차</span>
                    <div className="text-right">
                      {endDateTime ? (
                        <>
                          <p className="font-medium">{formatDate(endDateTime)}</p>
                          <p className="text-xs text-gray-600">{formatTime(endDateTime)}</p>
                        </>
                      ) : (
                        <p>-</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">총 일수</span>
                    <span className="font-medium">{reservation.days}일</span>
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

              <div className="text-center">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {reservation.status === 'confirmed' ? '예약 확정' :
                   reservation.status === 'cancelled' ? '예약 취소' :
                   reservation.status}
                </span>
              </div>

              {canModifyReservation(reservation) && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleCancel(reservation.id)}
                    className="flex-1 py-3 border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50"
                  >
                    예약 취소
                  </button>
                </div>
              )}

              {!canModifyReservation(reservation) && reservation.status === 'confirmed' && (
                <p className="text-xs text-gray-600 text-center pt-4">
                  입차 1일 전까지만 취소가 가능합니다
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export default ReservationLookup;