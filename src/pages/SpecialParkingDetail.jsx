import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { addDays } from 'date-fns';

import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import SideDrawer from '../components/layout/SideDrawer';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import DateRangeModal from '../components/modals/DateRangeModal';
import AirportModal from '../components/modals/AirportModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatDateKorean, formatTime } from '../utils/dateUtils';

const SpecialParkingDetail = () => {
  const { specialId } = useParams();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isAirportModalOpen, setIsAirportModalOpen] = useState(false);
  
  const [specialParking, setSpecialParking] = useState(null);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchData();
  }, [specialId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const specialDoc = await getDoc(doc(db, 'parkingSpecials', specialId));
      if (specialDoc.exists()) {
        setSpecialParking({
          id: specialDoc.id,
          ...specialDoc.data()
        });
      }

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
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateConfirm = (newStartDate, newStartTime, newEndDate, newEndTime) => {
    setStartDate(newStartDate);
    setStartTime(newStartTime);
    setEndDate(newEndDate);
    setEndTime(newEndTime);
  };

  const handleReservation = () => {
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
        specialType: specialId
      }
    });
  };

  if (loading) {
    return (
      <>
        <SEO />
        <Header onMenuClick={() => setIsDrawerOpen(true)} />
        <LoadingSpinner />
      </>
    );
  }

  if (!specialParking) {
    return (
      <>
        <SEO />
        <Header onMenuClick={() => setIsDrawerOpen(true)} />
        <div className="px-5 py-8 text-center">
          <p>주차장 정보를 찾을 수 없습니다</p>
        </div>
      </>
    );
  }

  const carImages = {
    'tesla': '/images/tesla.png',
    'bmw': '/images/bmw.png'
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={`${specialParking.nameKo} - PARKING 24`}
        description={`${specialParking.description || ''} 전용 주차 공간. 프리미엄 주차 서비스 제공. PARKING 24.`}
        keywords={`${specialParking.vehicleType}주차, 전용주차, 공항주차, ${specialParking.nameKo}, 인천공항주차`}
        url={`https://www.parking24.me/special-parking/${specialId}`}
      />
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="px-5 py-8">
        <div className="flex items-start gap-4 mb-6">
          {specialParking.vehicleType && carImages[specialParking.vehicleType] && (
            <img
              src={carImages[specialParking.vehicleType]}
              alt={specialParking.nameKo}
              className="w-24 h-24 object-contain"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2">{specialParking.nameKo}</h1>
            <p className="text-sm text-gray-600">{specialParking.description}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <h3 className="font-bold mb-3">제공 서비스</h3>
          <ul className="space-y-2">
            {specialParking.features?.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setIsAirportModalOpen(true)}
            className="w-full bg-gray-100 px-5 py-3 flex items-center justify-between rounded-lg"
          >
            <div className="text-left">
              <p className="font-semibold text-base">{selectedAirport?.name || '공항 선택'}</p>
              <p className="text-xs text-gray-600">{selectedAirport?.location || ''}</p>
            </div>
            <button className="text-sm text-gray-600">변경</button>
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => setIsDateModalOpen(true)}
            className="w-full bg-white border border-gray-300 px-6 py-4 flex items-center justify-between hover:border-black transition-colors rounded-lg"
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
            className="w-full bg-white border border-gray-300 px-6 py-4 flex items-center justify-between hover:border-black transition-colors rounded-lg"
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

        <Button onClick={handleReservation}>
          예약하기
        </Button>
      </div>

      <Footer />

      <AirportModal
        isOpen={isAirportModalOpen}
        onClose={() => setIsAirportModalOpen(false)}
        onSelect={setSelectedAirport}
        currentAirportId={selectedAirport?.id}
      />

      <DateRangeModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        onConfirm={handleDateConfirm}
        initialStartDate={startDate}
        initialEndDate={endDate}
        initialStartTime={startTime}
        initialEndTime={endTime}
      />
    </div>
  );
};

export default SpecialParkingDetail;