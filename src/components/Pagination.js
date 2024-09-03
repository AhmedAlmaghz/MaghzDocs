import React, { useContext } from 'react';
import { PaginationContext } from '../contexts/PaginationContext';
import { Link } from 'react-router-dom';

const Pagination = () => {
  const { currentPage, previousPage, nextPage } = useContext(PaginationContext);

  const getFileName = (path) => {
    return path ? path.split('/').pop().replace('.md', '') : '';
  };

  return (
    <nav className="flex justify-between items-center mt-8">
      {previousPage && (
        <Link 
          to={`/${previousPage}`} 
          className="flex flex-col items-center p-4 bg-transparent text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-transform transform hover:scale-105 shadow-lg w-1/3"
        >
          <span className="text-2xl font-bold">السابق</span>
          <span className="text-sm mt-2">{getFileName(previousPage)}</span>
        </Link>
      )}
      {nextPage && (
        <Link 
          to={`/${nextPage}`} 
          className="flex flex-col items-center p-4 bg-transparent text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-transform transform hover:scale-105 shadow-lg w-1/3"
        >
          <span className="text-2xl font-bold">التالي</span>
          <span className="text-sm mt-2">{getFileName(nextPage)}</span>
        </Link>
      )}
    </nav>
  );
};

export default React.memo(Pagination);