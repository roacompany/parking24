import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { addDays } from 'date-fns';

import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import LocationBar from '../components/layout/LocationBar';
import HeroTitle from '../components/layout/HeroTitle';
import Button from '../components/common/Button';
import SectionTitle from '../components/common/SectionTitle';
import ParkingCard from '../components/common/ParkingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const airportQuery = query(
        collection(db, 'airports'),
        where('isActive', '==', true)
      );
      const airportSnapshot = await getDocs(airportQuery);
      if (!airportSnapshot.empty) {
        const airportData = {
          id: airportSnapshot.docs[0].id,
          ...airportSnapshot.docs[0].data()
        };
        setSelectedAirport(airportData);
      }

      const specialsQuery = query(
        collection(db, 'parkingSpecials'),
        where('isActive', '==', true)
      );
      const specialsSnapshot = await getDocs(specialsQuery);
      const specialsData = specialsSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      setParkingSpecials(specialsData);

      const benefitsQuery = query(
        collection(db, 'benefits'),
        where('isActive', '==', true)
      );
      const benefitsSnapshot = await getDocs(benefitsQuery);
      const benefitsData = benefitsSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      setBenefits(benefitsData);

    } catch (error) {
      console.error('데이터 로드 실패:', error);
      alert('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

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

  // 스켈레톤 UI - LCP 개선을 위해 로딩 중에도 레이아웃 표시
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <SEO
          title="인천공항 주차대행 예약 - 270일 전 예약, 무료 취소 | PARKING 24"
          description="인천공항 주차 걱정 끝. 최대 270일 전 예약, 즉시 확정, 입차 전날까지 무료 취소. 실내주차·세차·핸들살균 서비스. 10분 셔틀로 공항까지."
          keywords="인천공항주차, 공항주차대행, 인천공항주차대행, 공항발렛파킹, Tesla주차, BMW주차, 장기주차, 공항주차예약"
          url="https://www.parking24.me"
        />
        <Header onMenuClick={() => setIsDrawerOpen(true)} />
        {/* 위치 바 스켈레톤 */}
        <div className="px-5 py-3 border-b border-gray-100">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        {/* 히어로 타이틀 - 실제 컨텐츠 표시 (LCP) */}
        <HeroTitle />
        {/* 날짜 선택 스켈레톤 */}
        <div className="px-5 space-y-3">
          <div className="w-full bg-gray-100 rounded-lg h-16 animate-pulse" />
          <div className="flex items-center justify-center">
            <div className="w-px h-6 bg-gray-300" />
          </div>
          <div className="w-full bg-gray-100 rounded-lg h-16 animate-pulse" />
        </div>
        {/* 검색 버튼 스켈레톤 */}
        <div className="px-5 mt-6">
          <div className="w-full bg-gray-200 rounded-lg h-12 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="PARKING 24 - 인천공항 주차대행 No.1 플랫폼"
        description="인천공항 주차대행 No.1 플랫폼. 최대 270일 전 예약 가능, 즉시 확정, 무료 취소. Tesla, BMW 전용 주차 서비스."
        keywords="공항주차, 인천공항주차, 주차대행, 발렛파킹, Tesla주차, BMW주차, 장기주차"
        url="https://www.parking24.me"
      />
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <Suspense fallback={null}>
        <SideDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </Suspense>
      <LocationBar 
        airport={selectedAirport}
        onAirportClick={() => setIsAirportModalOpen(true)}
      />
      <HeroTitle />

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

      {parkingSpecials.length > 0 && (
        <div className="mt-12">
          <SectionTitle>전용 주차 공간</SectionTitle>
          <div className="px-5 space-y-4">
            {parkingSpecials.map(special => (
              <ParkingCard key={special.id} special={special} />
            ))}
          </div>
        </div>
      )}

      {benefits.length > 0 && (
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