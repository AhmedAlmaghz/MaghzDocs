import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon, FaArrowRight, FaArrowLeft, FaGlobe } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';

const Theme = () => {
  const { theme, toggleTheme, direction, toggleDirection } = useContext(ThemeContext);
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex items-center">
      <button 
        onClick={toggleTheme} 
        className={` p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200 ${direction==='rtl' ? 'ml-2' :'mr-2'} `}
        aria-label={t('toggleTheme')}
      >
        {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
      </button>

      <button 
        onClick={toggleDirection}
        className={` p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200 ${direction==='rtl' ? 'ml-2' :'mr-2'} `}
        aria-label={t('toggleDirection')}
      >
        {direction === 'ltr' ? <FaArrowRight size={20} /> : <FaArrowLeft size={20} />}
      </button>

      <button 
        onClick={toggleLanguage}
        className={` p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200 ${direction==='rtl' ? 'ml-2' :'mr-2'} `}
        aria-label={t('toggleLanguage')}
      >
        <FaGlobe size={20} />
      </button>
    </div>
  );
};

export default React.memo(Theme);