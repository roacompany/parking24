import React from 'react';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, label: '일정 선택' },
    { number: 2, label: '티켓 선택' },
    { number: 3, label: '정보 입력' },
  ];

  return (
    <div className="flex items-center justify-center py-6 px-5">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          {/* 단계 표시 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm transition-all ${
                step.number <= currentStep 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.number <= currentStep ? '✓' : step.number}
            </div>
            <span className={`text-xs mt-2 ${
              step.number <= currentStep ? 'text-black font-medium' : 'text-gray-500'
            }`}>
              {step.label}
            </span>
          </div>

          {/* 연결선 */}
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-3 ${
              step.number < currentStep ? 'bg-black' : 'bg-gray-200'
            }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;