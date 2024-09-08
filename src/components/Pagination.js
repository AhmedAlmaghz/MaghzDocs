import React, { useContext } from 'react';
import { PaginationContext } from '../contexts/PaginationContext';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';


const Pagination = () => {
  const { t } = useTranslation();
  const { currentPage, previousPage, nextPage, previousPageTitle, nextPageTitle } = useContext(PaginationContext);
  const { direction } = useContext(ThemeContext);

  // const getFileName = (path) => {
  //   return path ? path.split('/').pop().replace('.md', '') : '';
  // };

  return (
    <nav className="pagination-container">
      {previousPage && (
        <Link
          to={`/${previousPage}`}
          className="pagination-button pagination-button-previous"
        >
          {direction === 'rtl' ? (
            <FaArrowRight className="ml-2" />
          ) : (
            <FaArrowLeft className="mr-2" />
          )}

          <span>
            <span className="block text-sm">{t('previous')}</span>
            <span className="block text-lg font-bold">{previousPageTitle}</span>
            {/* <span className="block text-lg font-bold">{getFileName(previousPage)}</span> */}
          </span>
        </Link>
      )}
      {nextPage && (
        <Link
          to={`/${nextPage}`}
          className="pagination-button pagination-button-next"
        >
          <span>
            <span className="block text-sm">{t('next')}</span>
            <span className="block text-lg font-bold">{nextPageTitle}</span>
            {/* <span className="block text-lg font-bold">{getFileName(nextPage)}</span> */}
          </span>
          {direction === 'rtl' ? (
            <FaArrowLeft className="mr-2" />
          ) : (
            <FaArrowRight className="ml-2" />
          )}

        </Link>
      )}
    </nav>
  );
};

export default React.memo(Pagination);