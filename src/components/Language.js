import React from 'react';
import { useTranslation } from 'react-i18next';

const Language = ({ languages }) => {
  const { i18n, t } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select 
      value={i18n.language} 
      onChange={handleChange} 
      className="p-2 border rounded"
      aria-label={t('selectLanguage')}
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {t(`language.${lang}`)}
        </option>
      ))}
    </select>
  );
};

export default React.memo(Language);