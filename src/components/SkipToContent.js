import React from 'react';
import { useTranslation } from 'react-i18next';

const SkipToContent = () => {
  const { t } = useTranslation();

  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-500 text-white p-2"
    >
      {t('skipToContent')}
    </a>
  );
};

export default SkipToContent;