import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { generateReservationNumber, calculateDays } from '../utils/dateUtils';

import Header from '../components/common/Header';
import SideDrawer from '../components/layout/SideDrawer';
import StepIndicator from '../components/layout/StepIndicator';
import ReservationSummaryCard from '../components/common/ReservationSummaryCard';
import ContactForm from '../components/common/ContactForm';
import DateRangeModal from '../components/modals/DateRangeModal';
import PlanModal from '../components/modals/PlanModal';

const ReservationInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { 
    airport, 
    startDate: initialStartDate, 
    startTime: initialStartTime, 
    endDate: initialEndDate, 
    endTime: initialEndTime, 
    selectedPlan: initialPlan, 
    days: initialDays 
  } = location.state || {};

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [startDate, setStartDate] = useState(initialStartDate);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);

  const days = calculateDays(new Date(startDate), new Date(endDate));
  const totalPrice = selectedPlan ? selectedPlan.pricePerDay * days : 0;

  useEffect(() => {
    if (!airport || !selectedPlan) {
      alert('잘못된 접근입니다');
      navigate('/');
    }
  }, [airport, selectedPlan, navigate]);

  const handleDateConfirm = (newStartDate, newStartTime, newEndDate, newEndTime) => {
    setStartDate(newStartDate);
    setStartTime(newStartTime);
    setEndDate(newEndDate);
    setEndTime(newEndTime);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setIsPlanModalOpen(false);
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      // startTime과 endTime이 이미 완전한 DateTime이므로 그대로 사용
      const reservationData = {
        reservationNumber: generateReservationNumber(),
        airportId: airport.id,
        airportName: airport.name,
        planId: selectedPlan.id,
        planName: selectedPlan.nameKo,
        startDateTime: new Date(startTime).toISOString(),
        endDateTime: new Date(endTime).toISOString(),
        days,
        totalPrice,
        vehicleNumber: formData.vehicleNumber,
        vehicleModel: formData.vehicleModel,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      console.log('저장할 데이터:', reservationData);

      await addDoc(collection(db, 'reservations'), reservationData);

      navigate('/reservation-complete', {
        state: { reservation: reservationData }
      });
    } catch (error) {
      console.error('예약 실패:', error);
      alert('예약에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!airport || !selectedPlan) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
      <StepIndicator currentStep={3} />

      <div className="px-5">
        <ReservationSummaryCard
          airport={airport}
          startDate={new Date(startDate)}
          startTime={new Date(startTime)}
          endDate={new Date(endDate)}
          endTime={new Date(endTime)}
          plan={selectedPlan}
          onEditReservation={() => setIsDateModalOpen(true)}
          onEditPlan={() => setIsPlanModalOpen(true)}
        />

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-6">예약자 정보</h2>
          <ContactForm 
            onSubmit={handleSubmit}
            totalPrice={totalPrice}
            days={days}
          />
        </div>
      </div>

      {submitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-center">예약 중...</p>
          </div>
        </div>
      )}

      <DateRangeModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        onConfirm={handleDateConfirm}
        initialStartDate={startDate}
        initialEndDate={endDate}
        initialStartTime={startTime}
        initialEndTime={endTime}
      />

      <PlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        onSelect={handlePlanSelect}
        days={days}
        currentPlanId={selectedPlan.id}
      />
    </div>
  );
};

export default ReservationInfo;