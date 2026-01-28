import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'PARKING 24 - 인천공항 주차대행 No.1 플랫폼',
  description = '인천공항 주차대행 No.1 플랫폼 PARKING 24. 최대 270일 전 예약 가능, 즉시 확정, 무료 취소.',
  keywords = '공항주차, 인천공항주차, 주차대행, 발렛파킹, Tesla주차, BMW주차',
  url = 'https://www.parking24.me',
  image = 'https://www.parking24.me/og-image.webp'
}) => {
  return (
    <Helmet>
      {/* 기본 메타태그 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph (Facebook, KakaoTalk) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;