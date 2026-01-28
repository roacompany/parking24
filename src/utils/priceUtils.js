/**
 * 숫자를 한국 원화 형식으로 변환
 * 예: 10000 → "10,000원"
 */
export const formatPrice = (price) => {
  return `${price.toLocaleString('ko-KR')}원`;
};

/**
 * 총 가격 계산
 */
export const calculateTotalPrice = (pricePerDay, days) => {
  return pricePerDay * days;
};

/**
 * 할인율 계산
 */
export const calculateDiscountRate = (originalPrice, discountedPrice) => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};