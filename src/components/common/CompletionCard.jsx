import React from 'react';

/**
 * 예약 완료 카드
 */
const CompletionCard = ({ message }) => {
  return (
    <div className="text-center py-12">
      {/* 체크 아이콘 */}
      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
        <svg 
          className="w-12 h-12 text-black" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={3} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>

      {/* 메시지 */}
      <h2 className="text-2xl font-bold mb-3">{message}</h2>
      <p className="text-gray-600">PARKING 24는 예약이 결제와 동시에 확정돼요</p>
    </div>
  );
};

export default CompletionCard;