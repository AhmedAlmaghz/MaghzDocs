import React, { createContext, useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [direction, setDirection] = useState('rtl');
  // i18n.changeLanguage('ar');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedDirection = localStorage.getItem('direction') || 'rtl';
    
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
    const newDirection= direction==='rtl' ?  'ltr': 'rtl';
    setDirection(newDirection);
    document.documentElement.dir = newDirection;
    localStorage.setItem('direction', newDirection);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);

    const newDirection= newLang==='ar' ? 'rtl': 'ltr'

    setDirection(newDirection);
    document.documentElement.dir = newDirection;
    localStorage.setItem('direction', newDirection);
    
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, direction, toggleDirection, toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};