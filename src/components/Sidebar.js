import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PaginationContext } from '../contexts/PaginationContext';
import { FaFolder, FaFolderOpen, FaFileAlt } from 'react-icons/fa'; // استيراد الأيقونات

const NestedList = ({ items, basePath = '' }) => {
  const location = useLocation();
  const { setCurrentPage, setPreviousPage, setNextPage } = useContext(PaginationContext);

  useEffect(() => {
    const currentIndex = items.findIndex(item => location.pathname.includes(item.path));
    if (currentIndex !== -1) {
      setCurrentPage(items[currentIndex].path);
      setPreviousPage(currentIndex > 0 ? items[currentIndex - 1].path : null);
      setNextPage(currentIndex < items.length - 1 ? items[currentIndex + 1].path : null);
    }
  }, [location.pathname, items, setCurrentPage, setPreviousPage, setNextPage]);

  return (
    <ul className="pl-4">
      {items.map((item, index) => (
        <li key={index} className="my-2">
          {item.type === 'directory' ? (
            <details className="group">
              <summary className="cursor-pointer font-bold flex items-center space-x-2 text-purple-600">
                <span className="group-open:hidden">
                  <FaFolder size={16} />
                </span>
                <span className="hidden group-open:inline">
                  <FaFolderOpen size={16} />
                </span>
                <span>{item.name}</span>
              </summary>
              <div className="ml-4 mt-2 border-l-2 border-purple-300 pl-4">
                <NestedList items={item.children || []} />
              </div>
            </details>
          ) : (
            <Link 
              to={`${basePath}/${item.path}`} 
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <FaFileAlt size={16} />
              <span>{item.name.replace('.md', '')}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

const Sidebar = () => {
  const [structure, setStructure] = useState([]);

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const response = await fetch('/markdown/structure.json');
        const data = await response.json();
        setStructure(data);
      } catch (error) {
        console.error('Error fetching structure:', error);
      }
    };
    fetchStructure();
  }, []);

  return (
    <aside className="bg-gradient-to-r from-gray-100 to-gray-200 p-5 w-64 overflow-auto shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">المحتويات</h2>
      <NestedList items={structure} />
    </aside>
  );
};

export default Sidebar;