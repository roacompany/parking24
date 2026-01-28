import React from 'react';
import { formatDate, formatTime, calculateDays } from '../../utils/dateUtils';
import { formatPrice } from '../../utils/priceUtils';

const ReservationSummaryCard = ({ 
  airport, 
  startDate, 
  startTime, 
  endDate, 
  endTime, 
  plan,
  onEditReservation,
  onEditPlan 
}) => {
  const days = calculateDays(startDate, endDate);
  const totalPrice = plan.pricePerDay * days;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg">내 예약정보</h3>
          <button 
            onClick={onEditReservation}
            className="text-sm text-gray-600 underline"
          >
            변경
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-5">
          <div className="mb-4">
            <p className="font-semibold">{airport.name}</p>
            <p className="text-xs text-gray-600">{airport.location}</p>
          </div>

          <p className="text-sm">
            {formatDate(startDate)} {formatTime(startTime)} ~ {formatDate(endDate)} {formatTime(endTime)}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg">이용권정보</h3>
          <button 
            onClick={onEditPlan}
            className="text-sm text-gray-600 underline"
          >
            변경
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="font-bold text-lg">{plan.nameKo}</p>
            <p className="font-bold text-xl">{formatPrice(totalPrice)}</p>
          </div>
          <p className="text-sm text-gray-600">{plan.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationSummaryCard;