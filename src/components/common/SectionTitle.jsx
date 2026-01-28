import React from 'react';

/**
 * 섹션 타이틀
 */
const SectionTitle = ({ children }) => {
  return (
    <h3 className="text-xl font-bold px-5 mb-4">
      {children}
    </h3>
  );
};

export default SectionTitle;