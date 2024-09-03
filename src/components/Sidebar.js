import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PaginationContext } from '../contexts/PaginationContext';

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
            <details>
              <summary className="cursor-pointer font-bold">{item.name}</summary>
              {/* <NestedList items={item.children || []} basePath={`${basePath}/${item.name}`} /> */}
              <NestedList items={item.children || []}  />
            </details>
          ) : (
            <Link to={`${basePath}/${item.path}`} className="text-blue-600 hover:underline">
              {item.name.replace('.md', '')}
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
    <aside className="bg-gray-100 p-4 w-64 overflow-auto">
      <h2 className="text-xl font-bold mb-4">المحتويات</h2>
      <NestedList items={structure} />
    </aside>
  );
};

export default Sidebar;