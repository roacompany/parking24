import React, { useState } from 'react';
import { format, addDays, isSameDay, isAfter, isBefore, startOfDay } from 'date-fns';
import { ko } from 'date-fns/locale';

const DateRangeModal = ({ isOpen, onClose, onConfirm, initialStartDate, initialEndDate, initialStartTime, initialEndTime }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(initialStartTime || (() => {
    const time = new Date();
    time.setHours(10, 0, 0, 0);
    return time;
  })());
  const [endTime, setEndTime] = useState(initialEndTime || (() => {
    const time = new Date();
    time.setHours(19, 0, 0, 0);
    return time;
  })());

  if (!isOpen) return null;

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const handleDateClick = (date) => {
    if (!date) return;

    const clickedDate = startOfDay(date);

    if (!startDate) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (!endDate) {
      if (isBefore(clickedDate, startDate)) {
        setStartDate(clickedDate);
        setEndDate(null);
      } else {
        setEndDate(clickedDate);
      }
    } else {
      setStartDate(clickedDate);
      setEndDate(null);
    }
  };

  const isDateInRange = (date) => {
    if (!date || !startDate) return false;
    if (!endDate) return isSameDay(date, startDate);
    return (isAfter(date, startDate) || isSameDay(date, startDate)) && 
           (isBefore(date, endDate) || isSameDay(date, endDate));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleConfirm = () => {
    if (!startDate || !endDate) {
      alert('출국일과 입국일을 모두 선택해주세요');
      return;
    }

    // 날짜와 시간을 합친 완전한 DateTime 생성
    const finalStartDateTime = new Date(startDate);
    finalStartDateTime.setHours(
      startTime.getHours(),
      startTime.getMinutes(),
      0,
      0
    );

    const finalEndDateTime = new Date(endDate);
    finalEndDateTime.setHours(
      endTime.getHours(),
      endTime.getMinutes(),
      0,
      0
    );

    // 날짜와 시간을 각각 전달
    onConfirm(
      startDate,           // 순수 날짜
      finalStartDateTime,  // 날짜 + 시간
      endDate,             // 순수 날짜
      finalEndDateTime     // 날짜 + 시간
    );
    onClose();
  };

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      timeOptions.push(timeString);
    }
  }

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-w-mobile mx-auto rounded-t-3xl pb-6">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold">날짜 선택</h3>
          <button onClick={onClose} className="text-2xl font-light">×</button>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrevMonth} className="p-2">&lt;</button>
            <h4 className="font-bold">
              {format(currentMonth, 'yyyy년 M월', { locale: ko })}
            </h4>
            <button onClick={handleNextMonth} className="p-2">&gt;</button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} className="text-center text-sm text-gray-600 py-2">
                {day}
              </div>
            ))}
            {days.map((date, index) => {
              const isStart = date && startDate && isSameDay(date, startDate);
              const isEnd = date && endDate && isSameDay(date, endDate);
              const inRange = date && isDateInRange(date);

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  disabled={!date}
                  className={`
                    aspect-square flex items-center justify-center text-sm
                    ${!date ? 'invisible' : ''}
                    ${isStart ? 'bg-black text-white rounded-l-full' : ''}
                    ${isEnd ? 'bg-black text-white rounded-r-full' : ''}
                    ${inRange && !isStart && !isEnd ? 'bg-black text-white' : ''}
                    ${!inRange && date ? 'hover:bg-gray-100 rounded-lg' : ''}
                  `}
                >
                  {date && format(date, 'd')}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">입차시간</label>
              <select
                value={format(startTime, 'HH:mm')}
                onChange={(e) => {
                  const [hour, minute] = e.target.value.split(':');
                  const newTime = new Date(startTime);
                  newTime.setHours(parseInt(hour), parseInt(minute), 0, 0);
                  setStartTime(newTime);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">출차시간</label>
              <select
                value={format(endTime, 'HH:mm')}
                onChange={(e) => {
                  const [hour, minute] = e.target.value.split(':');
                  const newTime = new Date(endTime);
                  newTime.setHours(parseInt(hour), parseInt(minute), 0, 0);
                  setEndTime(newTime);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangeModal;