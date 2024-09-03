import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon } from 'react-icons/fa'; // استيراد الأيقونات من react-icons

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
      <div className={`${theme} transition-colors duration-200 ease-in-out`}>
        {children}
        <button 
          onClick={toggleTheme} 
          className="fixed top-4 left-4 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110"
          aria-label={t('toggleTheme')}
        >
          {theme === 'light' ? (
            <FaMoon size={20} color="#4A5568" /> // اللون الرمادي الداكن للقمر
          ) : (
            <FaSun size={20} color="#FFD700" /> // اللون الأصفر للشمس
          )}
        </button>
      </div>
    </ThemeContext.Provider>
  );
};

export default Theme;