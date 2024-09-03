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
    <div className={`fixed bottom-4 left-4 flex flex-col space-y-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <button
        onClick={scrollToTop}
        className="p-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transition-all transform hover:scale-110"
        aria-label={t('scrollToTop')}
      >
        <FaArrowUp size={15} />
      </button>
      <button
        onClick={scrollToBottom}
        className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-500 hover:to-pink-600 transition-all transform hover:scale-110"
        aria-label={t('scrollToBottom')}
      >
        <FaArrowDown size={15} />
      </button>
    </div>
  );
};

export default React.memo(ScrollButtons);