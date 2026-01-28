import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { calculateDays } from '../utils/dateUtils';

import Header from '../components/common/Header';
import SideDrawer from '../components/layout/SideDrawer';
import StepIndicator from '../components/layout/StepIndicator';
import LocationDateCard from '../components/common/LocationDateCard';
import SectionTitle from '../components/common/SectionTitle';
import ParkingPlanCard from '../components/common/ParkingPlanCard';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DateRangeModal from '../components/modals/DateRangeModal';

const VehicleInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { 
    airport, 
    startDate: initialStartDate, 
    startTime: initialStartTime, 
    endDate: initialEndDate, 
    endTime: initialEndTime,
    specialType = null
  } = location.state || {};

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [parkingPlans, setParkingPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState(initialStartDate);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [endTime, setEndTime] = useState(initialEndTime);

  const days = calculateDays(new Date(startDate), new Date(endDate));

  const selectionRates = {
    'standard': 20,
    'pro': 56,
    'exclusive': 24
  };

  useEffect(() => {
    if (!airport) {
      alert('잘못된 접근입니다');
      navigate('/');
      return;
    }

    fetchParkingPlans();
  }, []);

  const fetchParkingPlans = async () => {
    setLoading(true);
    try {
      // 모든 활성 이용권 가져오기
      const q = query(
        collection(db, 'parkingPlans'),
        where('isActive', '==', true)
      );
      const snapshot = await getDocs(q);
      
      // 클라이언트에서 필터링 (specialType 필드가 없는 경우 대응)
      const plansData = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(plan => {
          // specialType이 없는 경우 null로 간주
          const planSpecialType = plan.specialType === undefined ? null : plan.specialType;
          return planSpecialType === specialType;
        })
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      
      setParkingPlans(plansData);

      const proPlan = plansData.find(plan => plan.nameEn?.toLowerCase() === 'pro');
      if (proPlan) {
        setSelectedPlan(proPlan);
      } else if (plansData.length > 0) {
        setSelectedPlan(plansData[0]);
      }
    } catch (error) {
      console.error('주차 플랜 조회 실패:', error);
      alert('주차 플랜을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selectedPlan) {
      alert('주차 플랜을 선택해주세요');
      return;
    }

    navigate('/reservation-info', {
      state: {
        airport,
        startDate,
        startTime,
        endDate,
        endTime,
        selectedPlan,
        days
      }
    });
  };

  const handleDateConfirm = (newStartDate, newStartTime, newEndDate, newEndTime) => {
    setStartDate(newStartDate);
    setStartTime(newStartTime);
    setEndDate(newEndDate);
    setEndTime(newEndTime);
  };

  if (loading) {
    return (
      <>
        <Header onMenuClick={() => setIsDrawerOpen(true)} />
        <StepIndicator currentStep={2} />
        <LoadingSpinner />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
      <StepIndicator currentStep={2} />

      <div className="px-5">
        <LocationDateCard
          airport={airport}
          startDate={new Date(startDate)}
          startTime={new Date(startTime)}
          endDate={new Date(endDate)}
          endTime={new Date(endTime)}
          onEdit={() => setIsDateModalOpen(true)}
        />

        <SectionTitle>
          {specialType ? `${specialType.toUpperCase()} 전용 이용권` : '주차 이용권 선택'}
        </SectionTitle>

        {parkingPlans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">이용 가능한 플랜이 없습니다</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {parkingPlans.map(plan => (
                <ParkingPlanCard
                  key={plan.id}
                  plan={plan}
                  days={days}
                  isSelected={selectedPlan?.id === plan.id}
                  onSelect={setSelectedPlan}
                  isDisabled={false}
                />
              ))}
            </div>

            {selectedPlan && (
              <p className="text-center text-sm text-gray-600 mb-6">
                전체 이용자의 {selectionRates[selectedPlan.nameEn?.toLowerCase()] || 0}%가 {selectedPlan.nameKo} 이용권을 선택했어요
              </p>
            )}
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-5 max-w-mobile mx-auto">
        <Button onClick={handleNext} disabled={!selectedPlan}>
          다음
        </Button>
      </div>

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

export default VehicleInfo;