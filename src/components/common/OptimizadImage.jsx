import React from 'react';

/**
 * 최적화된 이미지 컴포넌트
 * - lazy loading으로 뷰포트에 진입할 때만 로드
 * - width/height로 CLS 방지
 * - decoding="async"로 메인 스레드 차단 방지
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  priority = false // 중요한 이미지는 true
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={{
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  );
};

export default OptimizedImage;