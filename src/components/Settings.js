import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { i18n } = useTranslation();
  const [settings, setSettings] = useState({
    language: 'ar',
    direction: 'rtl',
    theme: 'light'
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => {
      const newSettings = { ...prev, [name]: value };
      localStorage.setItem('settings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  useEffect(() => {
    i18n.changeLanguage(settings.language);
    document.documentElement.dir = settings.direction;
    document.documentElement.className = settings.theme;
  }, [settings, i18n]);

  return (
    <div>
      <h2>الإعدادات</h2>
      <div>
        <label>
          اللغة:
          <select name="language" value={settings.language} onChange={handleChange}>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          الاتجاه:
          <select name="direction" value={settings.direction} onChange={handleChange}>
            <option value="rtl">من اليمين إلى اليسار</option>
            <option value="ltr">من اليسار إلى اليمين</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          المظهر:
          <select name="theme" value={settings.theme} onChange={handleChange}>
            <option value="light">فاتح</option>
            <option value="dark">داكن</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Settings;