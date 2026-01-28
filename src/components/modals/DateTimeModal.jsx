import React, { useState } from 'react';
import { format } from 'date-fns';

const DateTimeModal = ({ isOpen, onClose, onConfirm, initialDate, initialTime, title, minDate = null }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(initialTime);

  const handleConfirm = () => {
    onConfirm(selectedDate, selectedTime);
    onClose();
  };

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    
    if (minDate && newDate <= minDate) {
      alert('입국일은 출국일보다 늦어야 합니다');
      return;
    }
    
    setSelectedDate(newDate);
  };

  if (!isOpen) return null;

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      timeOptions.push(timeString);
    }
  }

  const minDateString = minDate ? format(minDate, 'yyyy-MM-dd') : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-w-mobile mx-auto rounded-t-3xl pb-6">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="text-2xl font-light">×</button>
        </div>

        <div className="p-5">
          <label className="block text-sm font-medium mb-2">날짜</label>
          <input
            type="date"
            value={format(selectedDate, 'yyyy-MM-dd')}
            min={minDateString}
            onChange={handleDateChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            style={{ borderRadius: '8px' }}
          />
        </div>

        <div className="px-5 pb-5">
          <label className="block text-sm font-medium mb-2">시간</label>
          <select
            value={format(selectedTime, 'HH:mm')}
            onChange={(e) => {
              const [hour, minute] = e.target.value.split(':');
              const newTime = new Date(selectedTime);
              newTime.setHours(parseInt(hour), parseInt(minute));
              setSelectedTime(newTime);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            style={{ borderRadius: '8px' }}
          >
            {timeOptions.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="px-5">
          <button
            onClick={handleConfirm}
            className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800"
            style={{ borderRadius: '8px' }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateTimeModal;