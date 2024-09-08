import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ScrollButtons = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className={`scroll-buttons ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <button
        onClick={scrollToTop}
        className="scroll-button scroll-button-top"
        aria-label={t('scrollToTop')}
      >
        <FaArrowUp size={15} />
      </button>
      <button
        onClick={scrollToBottom}
        className="scroll-button scroll-button-bottom"
        aria-label={t('scrollToBottom')}
      >
        <FaArrowDown size={15} />
      </button>
    </div>
  );
};

export default React.memo(ScrollButtons);