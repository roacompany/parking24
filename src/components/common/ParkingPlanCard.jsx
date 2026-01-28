import React from 'react';
import { formatPrice } from '../../utils/priceUtils';

const ParkingPlanCard = ({ plan, days, isSelected, onSelect, isDisabled }) => {
  const totalPrice = plan.pricePerDay * days;

  return (
    <div
      onClick={() => !isDisabled && onSelect(plan)}
      className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
        isSelected 
          ? 'border-black bg-gray-50' 
          : 'border-gray-200 hover:border-gray-400'
      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-bold text-lg mb-1">{plan.name}</h4>
          {plan.badge && (
            <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded">
              {plan.badge}
            </span>
          )}
        </div>
        
        <div className="text-right">
          <p className="font-bold text-xl">{formatPrice(totalPrice)}</p>
          <p className="text-xs text-gray-600">{formatPrice(plan.pricePerDay)}/일 • {days}일</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3">{plan.description}</p>

      <ul className="space-y-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-700">
            • {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingPlanCard;