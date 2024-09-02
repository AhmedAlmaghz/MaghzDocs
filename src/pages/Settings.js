import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

const Settings = () => {
  const { settings, updateSettings } = useSettings();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSettings({ [name]: value });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">الإعدادات</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">اللغة:</label>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">الاتجاه:</label>
          <select
            name="direction"
            value={settings.direction}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="rtl">من اليمين إلى اليسار</option>
            <option value="ltr">من اليسار إلى اليمين</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">السمة:</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="light">فاتح</option>
            <option value="dark">داكن</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;