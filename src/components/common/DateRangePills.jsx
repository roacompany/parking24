import React from 'react';
import { formatDateKorean, formatTime } from '../../utils/dateUtils';

const DateRangePills = ({ startDate, startTime, endDate, endTime, onStartClick, onEndClick }) => {
  return (
    <div className="px-5 space-y-3">
      <button
        onClick={onStartClick}
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
        onClick={onEndClick}
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
        <span className="text-sm text-gray-600 font-medium">총 4일</span>
      </button>
    </div>
  );
};

export default DateRangePills;