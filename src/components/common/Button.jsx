import React from 'react';

/**
 * 공통 버튼 컴포넌트
 * @param {string} children - 버튼 텍스트
 * @param {function} onClick - 클릭 이벤트
 * @param {string} variant - 버튼 스타일 (primary/secondary)
 * @param {boolean} disabled - 비활성화 여부
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = ''
}) => {
  const baseStyle = "w-full py-4 rounded-lg font-semibold text-lg transition-colors";
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 disabled:bg-gray-300",
    secondary: "bg-white text-black border-2 border-black hover:bg-gray-50"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;