import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays } from 'date-fns';

import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import LocationBar from '../components/layout/LocationBar';
import HeroTitle from '../components/layout/HeroTitle';
import Button from '../components/common/Button';
import SectionTitle from '../components/common/SectionTitle';
import ParkingCard from '../components/common/ParkingCard';
import { formatDateKorean, formatTime } from '../utils/dateUtils';

// 지연 로딩 컴포넌트 (초기 번들 크기 축소)
const SideDrawer = lazy(() => import('../components/layout/SideDrawer'));
const BenefitCard = lazy(() => import('../components/common/BenefitCard'));
const Footer = lazy(() => import('../components/common/Footer'));
const AirportModal = lazy(() => import('../components/modals/AirportModal'));
const DateRangeModal = lazy(() => import('../components/modals/DateRangeModal'));

const Home = () => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAirportModalOpen, setIsAirportModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const [selectedAirport, setSelectedAirport] = useState(null);

  const today = new Date();
  today.setHours(10, 0, 0, 0);

  const [startDate, setStartDate] = useState(today);
  const [startTime, setStartTime] = useState(today);
  const [endDate, setEndDate] = useState(addDays(today, 3));
  const [endTime, setEndTime] = useState(() => {
    const end = addDays(today, 3);
    end.setHours(19, 0, 0, 0);
    return end;
  });

  const [parkingSpecials, setParkingSpecials] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Firebase 동적 import - 렌더링 차단 없이 데이터 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Firebase를 동적으로 import (초기 번들에서 제외)
        const [{ db }, { collection, query, where, getDocs }] = await Promise.all([
          import('../config/firebase'),
          import('firebase/firestore')
        ]);

        // 모든 쿼리를 병렬로 실행
        const [airportSnapshot, specialsSnapshot, benefitsSnapshot] = await Promise.all([
          getDocs(query(collection(db, 'airports'), where('isActive', '==', true))),
          getDocs(query(collection(db, 'parkingSpecials'), where('isActive', '==', true))),
          getDocs(query(collection(db, 'benefits'), where('isActive', '==', true)))
        ]);

        if (!airportSnapshot.empty) {
          setSelectedAirport({
            id: airportSnapshot.docs[0].id,
            ...airportSnapshot.docs[0].data()
          });
        }

        setParkingSpecials(
          specialsSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
        );

        setBenefits(
          benefitsSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
        );

      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setDataLoaded(true);
      }
    };

    fetchInitialData();
  }, []);

  const handleSearch = () => {
    if (!selectedAirport) {
      alert('공항을 선택해주세요');
      return;
    }

    navigate('/vehicle-info', {
      state: {
        airport: selectedAirport,
        startDate,
        startTime,
        endDate,
        endTime,
        specialType: null
      }
    });
  };

  const handleDateConfirm = (newStartDate, newStartTime, newEndDate, newEndTime) => {
    setStartDate(newStartDate);
    setStartTime(newStartTime);
    setEndDate(newEndDate);
    setEndTime(newEndTime);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="인천공항 주차대행 예약 - 270일 전 예약, 무료 취소 | PARKING 24"
        description="인천공항 주차 걱정 끝. 최대 270일 전 예약, 즉시 확정, 입차 전날까지 무료 취소. 실내주차·세차·핸들살균 서비스. 10분 셔틀로 공항까지."
        keywords="인천공항주차, 공항주차대행, 인천공항주차대행, 공항발렛파킹, Tesla주차, BMW주차, 장기주차, 공항주차예약"
        url="https://www.parking24.me"
      />
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <Suspense fallback={null}>
        <SideDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </Suspense>

      {/* 위치 바 - 데이터 로딩 전에도 표시 */}
      <LocationBar
        airport={selectedAirport}
        onAirportClick={() => setIsAirportModalOpen(true)}
      />

      {/* 히어로 타이틀 - LCP 요소 */}
      <HeroTitle />

      {/* 날짜 선택 버튼 - 항상 표시 */}
      <div className="px-5 space-y-3">
        <button
          onClick={() => setIsDateModalOpen(true)}
          className="w-full bg-white border border-gray-300 px-6 py-4 flex items-center justify-between hover:border-black transition-colors"
          style={{ borderRadius: '8px' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-black"></div>
            <div className="text-left">
              <p className="text-sm font-semibold">{formatDateKorean(startDate)}</p>
              <p className="text-xs text-gray-600">{formatTime(startTime)}</p>
            </div>
          </div>
        </button>

        <div className="flex items-center justify-center">
          <div className="w-px h-6 bg-gray-300"></div>
        </div>

        <button
          onClick={() => setIsDateModalOpen(true)}
          className="w-full bg-white border border-gray-300 px-6 py-4 flex items-center justify-between hover:border-black transition-colors"
          style={{ borderRadius: '8px' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-black"></div>
            <div className="text-left">
              <p className="text-sm font-semibold">{formatDateKorean(endDate)}</p>
              <p className="text-xs text-gray-600">{formatTime(endTime)}</p>
            </div>
          </div>
        </button>
      </div>

      <div className="px-5 mt-6">
        <Button onClick={handleSearch}>
          검색
        </Button>
      </div>

      {/* 전용 주차 공간 - 데이터 로드 후 표시 */}
      {dataLoaded && parkingSpecials.length > 0 && (
        <div className="mt-12">
          <SectionTitle>전용 주차 공간</SectionTitle>
          <div className="px-5 space-y-4">
            {parkingSpecials.map(special => (
              <ParkingCard key={special.id} special={special} />
            ))}
          </div>
        </div>
      )}

      {/* 스켈레톤 - 데이터 로딩 중 */}
      {!dataLoaded && (
        <div className="mt-12 px-5 space-y-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="bg-gray-100 rounded-xl p-5 animate-pulse">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-48 bg-gray-200 rounded" />
          </div>
          <div className="bg-gray-100 rounded-xl p-5 animate-pulse">
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-48 bg-gray-200 rounded" />
          </div>
        </div>
      )}

      {dataLoaded && benefits.length > 0 && (
        <div className="px-5 mt-12">
          <Suspense fallback={<div className="h-32" />}>
            <BenefitCard benefits={benefits} />
          </Suspense>
        </div>
      )}

      <Suspense fallback={<div className="h-40 bg-gray-100 mt-12" />}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        {isAirportModalOpen && (
          <AirportModal
            isOpen={isAirportModalOpen}
            onClose={() => setIsAirportModalOpen(false)}
            onSelect={setSelectedAirport}
            currentAirportId={selectedAirport?.id}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {isDateModalOpen && (
          <DateRangeModal
            isOpen={isDateModalOpen}
            onClose={() => setIsDateModalOpen(false)}
            onConfirm={handleDateConfirm}
            initialStartDate={startDate}
            initialEndDate={endDate}
            initialStartTime={startTime}
            initialEndTime={endTime}
          />
        )}
      </Suspense>
    </div>
  );
};

export default Home;
