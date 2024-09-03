import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';

const Theme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
      aria-label={t('toggleTheme')}
    >
      {theme === 'light' ? (
        <FaMoon size={20} />
      ) : (
        <FaSun size={20} />
      )}
    </button>
  );
};

export default React.memo(Theme);