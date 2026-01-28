import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ParkingPlanCard from '../common/ParkingPlanCard';
import LoadingSpinner from '../common/LoadingSpinner';

const PlanModal = ({ isOpen, onClose, onSelect, days, currentPlanId }) => {
  const [parkingPlans, setParkingPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchParkingPlans();
    }
  }, [isOpen]);

  const fetchParkingPlans = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'parkingPlans'),
        where('isActive', '==', true)
      );
      const snapshot = await getDocs(q);
      const plansData = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      setParkingPlans(plansData);

      const currentPlan = plansData.find(plan => plan.id === currentPlanId);
      if (currentPlan) {
        setSelectedPlan(currentPlan);
      }
    } catch (error) {
      console.error('플랜 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedPlan) {
      onSelect(selectedPlan);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-w-mobile mx-auto rounded-t-3xl pb-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white">
          <h3 className="text-lg font-bold">이용권 변경</h3>
          <button onClick={onClose} className="text-2xl font-light">×</button>
        </div>

        <div className="p-5">
          {loading ? (
            <LoadingSpinner />
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

              <button
                onClick={handleConfirm}
                disabled={!selectedPlan}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400"
              >
                확인
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanModal;