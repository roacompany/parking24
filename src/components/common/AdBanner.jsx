import React from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

/**
 * 광고 배너
 */
const AdBanner = ({ ad }) => {
  // 광고 클릭 로그 저장
  const handleClick = async () => {
    try {
      await addDoc(collection(db, 'bannerAdClicks'), {
        adId: ad.id,
        clickedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });
      
      // 외부 링크 열기
      window.open(ad.targetUrl, '_blank');
    } catch (error) {
      console.error('광고 클릭 로그 저장 실패:', error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-100 rounded-xl p-5 cursor-pointer hover:bg-gray-200 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-600 mb-1">sponsored by {ad.sponsor}</p>
          <p className="font-semibold text-base">{ad.title}</p>
        </div>
        
        {/* 화살표 아이콘 */}
        <svg 
          className="w-6 h-6 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default AdBanner;