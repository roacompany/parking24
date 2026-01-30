import { Helmet } from 'react-helmet-async';

/**
 * BreadcrumbList 구조화 데이터 컴포넌트
 * @param {Array} items - 탐색경로 배열 [{name: '홈', url: '/'}, {name: '페이지명', url: '/path'}]
 */
const BreadcrumbSchema = ({ items }) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.parking24.me${item.url}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
    </Helmet>
  );
};

export default BreadcrumbSchema;
