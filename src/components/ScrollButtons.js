import React from 'react';
import { useTranslation } from 'react-i18next';

const ScrollButtons = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
      <button 
        onClick={scrollToTop} 
        className="p-2 bg-primary text-white rounded hover:bg-blue-700 transition-colors"
        aria-label={t('scrollToTop')}
      >
        {t('top')}
      </button>
      <button 
        onClick={scrollToBottom} 
        className="p-2 bg-primary text-white rounded hover:bg-blue-700 transition-colors"
        aria-label={t('scrollToBottom')}
      >
        {t('bottom')}
      </button>
    </div>
  );
};

export default React.memo(ScrollButtons);