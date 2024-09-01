import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NavigatePage = ({ to, label }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button 
      onClick={handleClick} 
      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      aria-label={t('navigateToAriaLabel', { page: label })}
    >
      {t('navigateTo', { page: label })}
    </button>
  );
};

export default React.memo(NavigatePage);