import React, { useState } from 'react';
import Header from '../components/common/Header';
import SideDrawer from '../components/layout/SideDrawer';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';

/**
 * 고객센터 페이지
 */
const CustomerService = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '일반 문의',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    '일반 문의',
    '예약 문의',
    '결제 문의',
    '취소/환불',
    '서비스 불만',
    '칭찬',
    '제휴 문의',
    '기타'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('모든 필수 항목을 입력해주세요');
      return;
    }

    // 실제로는 Firebase에 저장하거나 이메일 전송
    console.log('문의 내용:', formData);
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '일반 문의',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="px-5 py-8">
        <h1 className="text-3xl font-bold mb-4">고객센터</h1>
        <p className="text-gray-600 mb-8">무엇을 도와드릴까요?</p>

        {/* 연락처 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">전화 문의</h3>
            <p className="text-2xl font-bold text-blue-600 mb-1">1234-5678</p>
            <p className="text-sm text-gray-600">24시간 연중무휴</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">카카오톡</h3>
            <p className="text-lg font-bold text-green-600 mb-1">@parking24</p>
            <p className="text-sm text-gray-600">평일 09:00-18:00</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">이메일</h3>
            <p className="text-sm font-bold text-purple-600 mb-1">support@parking24.com</p>
            <p className="text-sm text-gray-600">24시간 이내 답변</p>
          </div>
        </div>

        {/* 빠른 링크 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">빠른 도움말</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.location.href = '/faq'}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-black transition-colors"
            >
              <div className="font-semibold mb-1">자주 묻는 질문</div>
              <div className="text-sm text-gray-600">FAQ 바로가기</div>
            </button>
            <button
              onClick={() => window.location.href = '/usage-guide'}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-black transition-colors"
            >
              <div className="font-semibold mb-1">이용 안내</div>
              <div className="text-sm text-gray-600">서비스 이용 방법</div>
            </button>
            <button
              onClick={() => window.location.href = '/reservation-lookup'}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-black transition-colors"
            >
              <div className="font-semibold mb-1">예약 조회</div>
              <div className="text-sm text-gray-600">내 예약 확인하기</div>
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 text-left hover:border-black transition-colors"
            >
              <div className="font-semibold mb-1">새 예약</div>
              <div className="text-sm text-gray-600">주차 예약하기</div>
            </button>
          </div>
        </div>

        {/* 문의하기 폼 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">1:1 문의하기</h2>
          
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">문의가 접수되었습니다</h3>
              <p className="text-gray-600">빠른 시일 내에 답변 드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">이름 *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">이메일 *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">연락처 *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-1234-5678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">문의 유형</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">문의 내용 *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="문의하실 내용을 자세히 작성해주세요"
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black resize-none"
                  required
                />
              </div>

              <Button type="submit">
                문의하기
              </Button>
            </form>
          )}
        </div>

        {/* 오시는 길 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">오시는 길</h2>
          <div className="bg-gray-100 rounded-xl p-6">
            <h3 className="font-bold mb-3">PARKING 24 본사</h3>
            <div className="space-y-2 text-sm text-gray-700 mb-4">
              <p>주소: 인천광역시 중구 공항로 272</p>
              <p>대표전화: 1234-5678</p>
              <p>팩스: 032-1234-5678</p>
              <p>사업자등록번호: 123-45-67890</p>
            </div>
            {/* 지도 (회색 박스) */}
            <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">지도 영역</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerService;