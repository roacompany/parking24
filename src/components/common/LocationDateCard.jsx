import React from 'react';
import { formatDate, formatTime, calculateDays } from '../../utils/dateUtils';

const LocationDateCard = ({ airport, startDate, startTime, endDate, endTime, onEdit }) => {
  const days = calculateDays(startDate, endDate);

  return (
    <div className="bg-gray-50 rounded-xl p-5 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold">{airport.name}</p>
          <p className="text-xs text-gray-600">{airport.location}</p>
        </div>
        <button 
          onClick={onEdit}
          className="text-sm text-gray-600 underline"
        >
          변경
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-black"></div>
          <div>
            <p className="text-sm font-medium">{formatDate(startDate)}</p>
            <p className="text-xs text-gray-600">{formatTime(startTime)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-black"></div>
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm font-medium">{formatDate(endDate)}</p>
              <p className="text-xs text-gray-600">{formatTime(endTime)}</p>
            </div>
            <span className="text-sm text-gray-600 ml-4">총 {days}일</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDateCard;