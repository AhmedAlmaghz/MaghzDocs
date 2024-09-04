import React, { createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [direction, setDirection] = useState('ltr');
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedDirection = localStorage.getItem('direction') || 'ltr';
    
    setTheme(savedTheme);
    setDirection(savedDirection);
    
    document.documentElement.classList.add(savedTheme);
    document.documentElement.dir = savedDirection;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleDirection = () => {
    const newDirection = direction === 'rtl' ? 'ltr' : 'rtl';
    setDirection(newDirection);
    document.documentElement.dir = newDirection;
    localStorage.setItem('direction', newDirection);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, direction, toggleDirection, toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};