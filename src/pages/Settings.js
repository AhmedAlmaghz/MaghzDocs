// import React, {useState, useEffect} from 'react';
// import { useSettings } from '../contexts/SettingsContext';
// import { useTranslation } from 'react-i18next';
// import { FaGlobe, FaAlignLeft, FaSun } from 'react-icons/fa';


// const Settings = () => {
//   const { settings, updateSettings, resetSettings } = useSettings();
//   const { t } = useTranslation();
//   const { i18n } = useTranslation();

//   const [setting, setSetting] = useState({
//     language: 'ar',
//     direction: 'rtl',
//     theme: 'light'
//   });

//   useEffect(() => {
//     const savedSettings = localStorage.getItem('settings');
//     if (savedSettings) {
//       setSetting(JSON.parse(savedSettings));
//     }
//   }, []);

//   useEffect(() => {
//     // i18n.changeLanguage(setting.language);
//     document.documentElement.lang = setting.language;
//     document.documentElement.dir = setting.direction;
//     document.documentElement.className = setting.theme;
//   }, [setting, i18n]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSetting(prev => {
//       const newSettings = { ...prev, [name]: value };
//       localStorage.setItem('settings', JSON.stringify(newSettings));
//       return newSettings;
//     });
//     updateSettings({ [name]: value });
//   };


  
//   return (
//     <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-8">
//       <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">{t('settings')}</h1>
//       <div className="space-y-6">
//         <div className="flex items-center space-x-4">
//           <FaGlobe className="text-blue-500" size={24} />
//           <div className="flex-grow">
//             <label className="block mb-2 font-medium dark:text-white">{t('language')}:</label>
//             <select
//               name="language"
//               value={settings.language}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//             >
//               <option value="ar">{t('arabic')}</option>
//               <option value="en">{t('english')}</option>
//             </select>
//           </div>
//         </div>
//         <div className="flex items-center space-x-4">
//           <FaAlignLeft className="text-green-500" size={24} />
//           <div className="flex-grow">
//             <label className="block mb-2 font-medium dark:text-white">{t('direction')}:</label>
//             <select
//               name="direction"
//               value={settings.direction}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
//             >
//               <option value="rtl">{t('rightToLeft')}</option>
//               <option value="ltr">{t('leftToRight')}</option>
//             </select>
//           </div>
//         </div>
//         <div className="flex items-center space-x-4">
//           <FaSun className="text-yellow-500" size={24} />
//           <div className="flex-grow">
//             <label className="block mb-2 font-medium dark:text-white">{t('theme')}:</label>
//             <select
//               name="theme"
//               value={settings.theme}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
//             >
//               <option value="light">{t('light')}</option>
//               <option value="dark">{t('dark')}</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <button
//         onClick={resetSettings}
//         className="mt-8 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
//       >
//         {t('resetSettings')}
//       </button>
//     </div>
//   );
// };

// export default Settings;


import React, { useState } from 'react';
import yaml from 'js-yaml';
import axios from 'axios';

const Settings = () => {
  const [yamlData, setYamlData] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);

  // دالة لتحويل YAML إلى JSON بالشكل المطلوب
  const convertToCustomJson = (node) => {
    // تحقق مما إذا كان "sections" موجودة
    if (node.sections && Array.isArray(node.sections)) {
      return {
        name: node.title || 'بدون عنوان', // تأكد من وجود العنوان
        type: 'directory',
        children: node.sections.map(convertToCustomJson) // تحويل كل عنصر داخل القسم
      };
    }
    // تحقق مما إذا كان "local" موجود
    if (node.local) {
      return {
        name: node.title || 'بدون عنوان', // تأكد من وجود العنوان
        type: 'file',
        path: node.local
      };
    }
    return {}; // في حال عدم وجود أي من هذه الحقول
  };

  // دالة لتحليل YAML وتحويله إلى JSON
  const convertYamlToJson = (yamlStr) => {
    try {
      setError(null);
      const parsedYaml = yaml.load(yamlStr); // تحويل YAML إلى JavaScript object
      console.log('Parsed YAML:', parsedYaml);
      
      // تحقق مما إذا كان هناك جذر للملف
      const convertedData = Array.isArray(parsedYaml)
        ? parsedYaml.map(convertToCustomJson)
        : convertToCustomJson(parsedYaml);
      
      console.log('Converted Data:', convertedData); // تتبع النتيجة المحولة
      setJsonData(convertedData);
    } catch (error) {
      console.error('Error converting YAML to JSON:', error);
      setError('Error converting YAML to JSON: ' + error.message);
    }
  };

  // دالة لتحميل الملف ومعالجته
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setYamlData(content);
      console.log('YAML Content:', content);
      convertYamlToJson(content);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h1>YAML to JSON Converter</h1>
      <input type="file" accept=".yml,.yaml" onChange={handleFileUpload} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {jsonData ? (
        <div>
          <h2>Converted JSON</h2>
          <pre>
            <code>
              {JSON.stringify(jsonData, null, 2)}
            </code>
          </pre>
        </div>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

// export default YamlToJsonConverter;
export default Settings;
