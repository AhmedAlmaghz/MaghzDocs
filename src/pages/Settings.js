import React, { useState, useEffect,useContext } from 'react';
// import { useSettings } from '../contexts/SettingsContext';
import { ThemeContext } from '../contexts/ThemeContext';

import { useTranslation } from 'react-i18next';
import { FaGlobe, FaAlignLeft, FaSun } from 'react-icons/fa';


const Settings = () => {
  // const { settings, updateSettings, resetSettings } = useSettings();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { theme, toggleTheme, direction, toggleDirection,language, toggleLanguage } = useContext(ThemeContext);
  const [settings, setSetting] = useState({
    language: language,
    direction: direction,
    theme: theme
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSetting(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // i18n.changeLanguage(setting.language);
    document.documentElement.lang = settings.language;
    document.documentElement.dir = settings.direction;
    document.documentElement.className = settings.theme;
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setSetting(prev => {
  //     const newSettings = { ...prev, [name]: value };
  //     localStorage.setItem('settings', JSON.stringify(newSettings));
  //     return newSettings;
  //   });
  //   updateSettings({ [name]: value });
  // };

  const resetSettings=()=>{

  }



  return (
    <div className="settings-container">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">{t('settings')}</h1>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <FaGlobe className="text-blue-500" size={24} />
          <div className="flex-grow">
            <label className="block mb-2 font-medium dark:text-white">{t('language')}:</label>
            <select
              name="language"
              value={settings.language}
              // onChange={toggleLanguage}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 "
            >
              <option value="ar">{t('arabic')}</option>
              <option value="en">{t('english')}</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FaAlignLeft className="text-green-500" size={24} />
          <div className="flex-grow">
            <label className="block mb-2 font-medium dark:text-white">{t('direction')}:</label>
            <select
              name="direction"
              value={settings.direction}
              // onChange={toggleDirection}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 "
            >
              <option value="rtl">{t('rightToLeft')}</option>
              <option value="ltr">{t('leftToRight')}</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FaSun className="text-yellow-500" size={24} />
          <div className="flex-grow">
            <label className="block mb-2 font-medium dark:text-white">{t('theme')}:</label>
            <select
              name="theme"
              value={settings.theme}
              // onChange={toggleTheme}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500"
              >
              <option value="light">{t('light')}</option>
              <option value="dark">{t('dark')}</option>
            </select>
          </div>
        </div>
      </div>
      <button
        onClick={resetSettings}
        className="mt-8 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
      >
        {t('resetSettings')}
      </button>
    </div>
  );
};

export default Settings;