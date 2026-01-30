import React from 'react';

const LocationBar = ({ airport, onAirportClick }) => {
  // 로딩 중에도 레이아웃 유지 (CLS 방지)
  return (
    <div
      className="bg-gray-100 px-5 py-3 flex items-center justify-between cursor-pointer"
      onClick={onAirportClick}
    >
      <div>
        {airport ? (
          <>
            <p className="font-semibold text-base">{airport.name}</p>
            <p className="text-xs text-gray-600">{airport.location}</p>
          </>
        ) : (
          <>
            <p className="font-semibold text-base">인천국제공항</p>
            <p className="text-xs text-gray-600">로딩 중...</p>
          </>
        )}
      </div>
      <button className="text-sm text-gray-600">변경</button>
    </div>
  );
};

export default LocationBar;