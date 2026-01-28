/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#4B5563',
        background: '#F5F5F5',
      },
      maxWidth: {
        'mobile': '480px',
      },
      fontSize: {
        'xs': '10px',      // 작은 텍스트
        'sm': '12px',      // 설명 텍스트
        'base': '12px',    // 본문
        'md': '15px',      // 카드 타이틀
        'lg': '18px',      // 섹션 타이틀
        'xl': '20px',      
        '2xl': '22px',     // 로고, 페이지 타이틀
        '3xl': '22px',     // 페이지 타이틀
      }
    },
  },
  plugins: [],
}