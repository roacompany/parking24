import React, { useState } from 'react';
import { formatPrice } from '../../utils/priceUtils';
import Button from './Button';

const ContactForm = ({ onSubmit, totalPrice, days }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleVehicleNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setVehicleNumber(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomerPhone(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vehicleNumber.trim()) {
      alert('차량번호를 입력해주세요');
      return;
    }

    if (!vehicleModel.trim()) {
      alert('차량 모델을 입력해주세요');
      return;
    }

    if (!customerName.trim()) {
      alert('예약자명을 입력해주세요');
      return;
    }

    if (!customerPhone.trim() || customerPhone.length < 10) {
      alert('올바른 연락처를 입력해주세요');
      return;
    }

    if (!agreedToTerms) {
      alert('약관에 동의해주세요');
      return;
    }

    onSubmit({
      vehicleNumber,
      vehicleModel,
      customerName,
      customerPhone
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">차량번호</label>
        <input
          type="text"
          value={vehicleNumber}
          onChange={handleVehicleNumberChange}
          placeholder="12가3456"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
        <p className="text-xs text-gray-500 mt-1">띄어쓰기 없이 입력해주세요</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">차량 모델</label>
        <input
          type="text"
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
          placeholder="아반떼 CN7"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">예약자명</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="홍길동"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">연락처</label>
        <input
          type="tel"
          value={customerPhone}
          onChange={handlePhoneChange}
          placeholder="01012345678"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
        <p className="text-xs text-gray-500 mt-1">숫자만 입력해주세요</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">총 {days}일</span>
          <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
        </div>
        <p className="text-xs text-gray-600">출차 시 현장 결제</p>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          개인정보 수집 및 이용, 서비스 이용약관에 동의합니다.
        </label>
      </div>

      <Button type="submit">
        {formatPrice(totalPrice)} 예약하기
      </Button>
    </form>
  );
};

export default ContactForm;