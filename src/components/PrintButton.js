import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaPrint } from 'react-icons/fa';

const PrintButton = () => {
  const { t } = useTranslation();

  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
    >
      <FaPrint />
      <span>{t('print')}</span>
    </button>
  );
};

export default PrintButton;