import React from 'react';

const BenefitCard = ({ benefits }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-bold text-lg mb-4">혜택</h3>
      
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            {/* 체크 아이콘 - SVG 사용 */}
            <svg 
              className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-sm text-gray-700">{benefit.title}</span>
          </li>
        ))}
      </ul>

      <button className="text-sm text-gray-600 underline mt-4">
        약관보기
      </button>
    </div>
  );
};

export default BenefitCard;