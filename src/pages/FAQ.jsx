import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import SideDrawer from '../components/layout/SideDrawer';
import Footer from '../components/common/Footer';

/**
 * FAQ 페이지
 */
const FAQ = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: '예약',
      items: [
        {
          question: '예약은 언제부터 가능한가요?',
          answer: '최대 270일 전부터 예약이 가능합니다. 단, 당일 예약은 입차 시간 2시간 전까지만 가능합니다.'
        },
        {
          question: '예약 확정은 언제 되나요?',
          answer: '예약 즉시 자동으로 확정됩니다. 별도의 승인 절차 없이 예약번호를 받으시면 예약이 완료된 것입니다.'
        },
        {
          question: '예약 변경은 어떻게 하나요?',
          answer: '고객센터(010-9018-8885)로 연락 주시거나 예약 조회 페이지에서 변경하실 수 있습니다. 입차 1일 전까지 무료 변경이 가능합니다.'
        },
        {
          question: '예약을 취소하고 싶어요',
          answer: '입차 1일 전까지는 무료로 취소가 가능합니다. 고객센터로 연락 주시거나 예약 조회 페이지에서 직접 취소하실 수 있습니다.'
        }
      ]
    },
    {
      category: '이용',
      items: [
        {
          question: '입차는 어떻게 하나요?',
          answer: '예약 시간에 맞춰 지정된 주차장으로 오시면 됩니다. 직원이 안내해드리며, 차량 키를 맡기시고 예약번호를 확인받으시면 됩니다.'
        },
        {
          question: '출차는 언제 어떻게 하나요?',
          answer: '공항 착륙 직후 입차 시 전달받은 드라이버 연락처로 연락 주시면 됩니다. 지정된 장소에서 차량을 인수하시고 현장 결제 후 출발하시면 됩니다.'
        },
        {
          question: '예약 시간보다 늦게 도착하면 어떻게 되나요?',
          answer: '최대 1시간까지는 유예 시간이 있습니다. 그 이상 지연되면 추가 요금이 발생할 수 있으니 미리 연락 주시기 바랍니다.'
        },
        {
          question: '예약 시간보다 일찍 출차하면 환불받나요?',
          answer: '죄송하지만 조기 출차 시 환불은 불가능합니다. 예약하신 기간에 대한 요금이 청구됩니다.'
        }
      ]
    },
    {
      category: '결제',
      items: [
        {
          question: '결제는 언제 하나요?',
          answer: '모든 결제는 출차 시 현장에서 진행됩니다. 예약 시에는 결제가 이루어지지 않습니다.'
        },
        {
          question: '어떤 결제 방법이 가능한가요?',
          answer: '신용카드, 체크카드, 현금 결제가 모두 가능합니다. 간편결제(카카오페이, 네이버페이 등)는 현재 준비 중입니다.'
        },
        {
          question: '현금영수증이나 세금계산서 발행이 가능한가요?',
          answer: '네, 가능합니다. 결제 시 직원에게 요청하시면 즉시 발행해드립니다.'
        },
        {
          question: '카드 할부가 되나요?',
          answer: '네, 신용카드 할부 결제가 가능합니다. 무이자 할부는 카드사 이벤트에 따라 달라질 수 있습니다.'
        }
      ]
    },
    {
      category: '주차 서비스',
      items: [
        {
          question: 'Standard, Pro, Exclusive의 차이가 뭔가요?',
          answer: 'Standard는 실외 주차, Pro는 실내 우선 배정과 차량 덮개 제공, Exclusive는 Pro 서비스에 워터프리 세차와 핸들살균이 추가됩니다.'
        },
        {
          question: 'Tesla/BMW 전용 주차는 어떤 서비스인가요?',
          answer: 'Tesla 전용은 배터리 충전 서비스가 포함되며, BMW 전용은 100% 실내 주차가 보장됩니다. 두 서비스 모두 프리미엄 관리를 받으실 수 있습니다.'
        },
        {
          question: '차량 보험은 어떻게 되나요?',
          answer: '모든 차량은 당사 보험으로 보호됩니다. 만약의 사고 발생 시에도 고객님께 책임이 없습니다.'
        },
        {
          question: '차량에 귀중품을 두고 가도 되나요?',
          answer: '절대 안 됩니다. 모든 귀중품은 반드시 가져가셔야 하며, 분실 시 책임지지 않습니다.'
        }
      ]
    },
    {
      category: '기타',
      items: [
        {
          question: '예약번호를 잃어버렸어요',
          answer: '예약 조회 페이지에서 예약번호와 연락처를 입력하시면 조회가 가능합니다. 연락처로 문자가 발송되어 있으니 확인해주세요.'
        },
        {
          question: '영업시간이 어떻게 되나요?',
          answer: '24시간 연중무휴로 운영됩니다. 심야/새벽 시간대에도 입출차가 가능합니다.'
        },
        {
          question: '공항까지 셔틀 운행이 되나요?',
          answer: '네, 무료 셔틀이 10분 간격으로 운행됩니다. 입차 시 직원에게 요청하시면 됩니다.'
        },
        {
          question: '장기 주차 할인이 있나요?',
          answer: '7일 이상 주차 시 10%, 14일 이상 주차 시 15% 할인이 적용됩니다.'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, itemIndex) => {
    const index = `${categoryIndex}-${itemIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ 구조화 데이터 생성
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.flatMap(category =>
      category.items.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    )
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="자주 묻는 질문 | PARKING 24"
        description="인천공항 주차대행 서비스 이용 관련 자주 묻는 질문과 답변"
        url="https://www.parking24.me/faq"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>
      <Header onMenuClick={() => setIsDrawerOpen(true)} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="px-5 py-8">
        <h1 className="text-3xl font-bold mb-4">자주 묻는 질문</h1>
        <p className="text-gray-600 mb-8">고객님들께서 자주 문의하시는 내용을 모았습니다.</p>

        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600">{category.category}</h2>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => {
                const index = `${categoryIndex}-${itemIndex}`;
                const isOpen = openIndex === index;

                return (
                  <div key={itemIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(categoryIndex, itemIndex)}
                      className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-left">{item.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* 추가 문의 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-12">
          <h3 className="font-bold text-lg mb-3">원하시는 답변을 찾지 못하셨나요?</h3>
          <p className="text-gray-700 mb-4">고객센터로 문의해주시면 친절하게 안내해드리겠습니다.</p>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">전화:</span> 010-9018-8885
            </p>
            <p className="text-sm">
              <span className="font-semibold">이메일:</span> support@parking24.com
            </p>
            <p className="text-sm">
              <span className="font-semibold">카카오톡:</span> @parking24
            </p>
            <p className="text-sm text-gray-600">운영시간: 24시간 연중무휴</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;