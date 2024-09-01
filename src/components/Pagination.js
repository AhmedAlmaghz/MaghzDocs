import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Pagination = ({ currentPage, totalPages, basePath }) => {
  const { t } = useTranslation();

  return (
    <nav className="flex justify-between items-center mt-4" aria-label={t('paginationNavigation')}>
      {currentPage > 1 && (
        <Link 
          to={`${basePath}/${currentPage - 1}`} 
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          aria-label={t('previousPage')}
        >
          {t('previous')}
        </Link>
      )}
      <span>{t('pageXOfY', { current: currentPage, total: totalPages })}</span>
      {currentPage < totalPages && (
        <Link 
          to={`${basePath}/${currentPage + 1}`} 
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          aria-label={t('nextPage')}
        >
          {t('next')}
        </Link>
      )}
    </nav>
  );
};

export default React.memo(Pagination);