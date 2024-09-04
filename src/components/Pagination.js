import React, { useContext } from 'react';
import { PaginationContext } from '../contexts/PaginationContext';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';

const Pagination = () => {
  const { currentPage, previousPage, nextPage } = useContext(PaginationContext);
  const { direction } = useContext(ThemeContext);

  const getFileName = (path) => {
    return path ? path.split('/').pop().replace('.md', '') : '';
  };

  return (
    <nav className="flex justify-between items-center mt-12 mb-8">
      {previousPage && (
        <Link 
          to={`/${previousPage}`} 
          className="flex items-center p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md"
        >
           {direction==='rtl'? (
             <FaArrowRight className="ml-2" />
          ):(
            <FaArrowLeft className="mr-2" />
          )}
          
          <span>
            <span className="block text-sm">السابق</span>
            <span className="block text-lg font-bold">{getFileName(previousPage)}</span>
          </span>
        </Link>
      )}
      {nextPage && (
        <Link 
          to={`/${nextPage}`} 
          className="flex items-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          <span>
            <span className="block text-sm">التالي</span>
            <span className="block text-lg font-bold">{getFileName(nextPage)}</span>
          </span>
          {direction==='rtl'? (
            <FaArrowLeft className="mr-2" />
          ):(
              <FaArrowRight className="ml-2" />
          )}

        </Link>
      )}
    </nav>
  );
};

export default React.memo(Pagination);