import React from 'react';
import { useNavigate } from 'react-router-dom';

const ParkingCard = ({ special }) => {
  const navigate = useNavigate();

  const handleReservation = () => {
    navigate(`/special-parking/${special.id}`);
  };

  // 차량 이미지 매핑
  const carImages = {
    'tesla': '/images/tesla.png',
    'bmw': '/images/bmw.png'
  };

  return (
    <div className="bg-gray-100 rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-bold text-md mb-2">{special.nameKo}</h4>
          <p className="text-sm text-gray-600 mb-1">{special.description}</p>
          <p className="text-xs text-gray-600">{special.features.join(', ')}</p>
        </div>
        
        {/* 차량 이미지 */}
        {special.vehicleType && carImages[special.vehicleType] ? (
          <img
            src={carImages[special.vehicleType]}
            alt={special.nameKo}
            className="w-16 h-16 object-contain flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
        )}
      </div>

      <button 
        onClick={handleReservation}
        className="w-full bg-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
      >
        예약하기
      </button>
    </div>
  );
};

export default ParkingCard;