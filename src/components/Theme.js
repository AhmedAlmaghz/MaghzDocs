import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const ThemeContext = createContext();

const Theme = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const { t } = useTranslation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme} transition-colors duration-200`}>
        {children}
        <button 
          onClick={toggleTheme} 
          className="fixed top-4 right-4 p-2 bg-primary text-white rounded"
          aria-label={t('toggleTheme')}
        >
          {t(theme === 'light' ? 'darkMode' : 'lightMode')}
        </button>
      </div>
    </ThemeContext.Provider>
  );
};

export default Theme;