// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// const Pagination = ({ currentPage, totalPages, basePath }) => {
//   const { t } = useTranslation();

//   return (
//     <nav className="flex justify-between items-center mt-4" aria-label={t('paginationNavigation')}>
//       {currentPage > 1 && (
//         <Link 
//           to={`${basePath}/${currentPage - 1}`} 
//           className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//           aria-label={t('previousPage')}
//         >
//           {t('previous')}
//         </Link>
//       )}
//       {currentPage < totalPages && (
//         <Link 
//           to={`${basePath}/${currentPage + 1}`} 
//           className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//           aria-label={t('nextPage')}
//         >
//           {t('next')}
//         </Link>
//       )}
//     </nav>
//   );
// };

// export default React.memo(Pagination);


import React, { useContext } from 'react';
import { PaginationContext } from '../contexts/PaginationContext';
import { Link } from 'react-router-dom';

const Pagination = () => {
  const { currentPage, previousPage, nextPage } = useContext(PaginationContext);

  return (
    <nav className="flex justify-between items-center mt-4">
      {previousPage && (
        <Link to={`/${previousPage}`} className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          السابق
        </Link>
      )}
      {nextPage && (
        <Link to={`/${nextPage}`} className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          التالي
        </Link>
      )}
    </nav>
  );
};

export default React.memo(Pagination);