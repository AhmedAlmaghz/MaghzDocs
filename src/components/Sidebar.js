// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { PaginationContext } from '../contexts/PaginationContext';
// import { FaFolder, FaFolderOpen, FaFileAlt } from 'react-icons/fa';
// // import useCache from '../hooks/useCache';

// const NestedList = ({ items, basePath = '' }) => {
//   const location = useLocation();
//   const { setCurrentPage, setPreviousPage, setNextPage } = useContext(PaginationContext);

//   useEffect(() => {
//     const currentIndex = items.findIndex(item => location.pathname.includes(item.path));
//     if (currentIndex !== -1) {
//       setCurrentPage(items[currentIndex].path);
//       setPreviousPage(currentIndex > 0 ? items[currentIndex - 1].path : null);
//       setNextPage(currentIndex < items.length - 1 ? items[currentIndex + 1].path : null);
//     }
//   }, [location.pathname, items, setCurrentPage, setPreviousPage, setNextPage]);

//   return (
//     <ul className="pl-4">
//       {items.map((item, index) => (
//         <li key={index} className="my-2">
//           {item.type === 'directory' ? (
//             <details className="group transition-all duration-300 ease-in-out">
//               <summary className="cursor-pointer font-bold flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-200">
//                 <span className="group-open:hidden">
//                   <FaFolder size={16} />
//                 </span>
//                 <span className="hidden group-open:inline">
//                   <FaFolderOpen size={16} />
//                 </span>
//                 <span>{item.name}</span>
//               </summary>
//               <div className="ml-4 mt-2 border-l-2 border-purple-300 pl-4 transition-all duration-300 ease-in-out">
//                 {/* <NestedList items={item.children || []} basePath={`${basePath}/${item.path}`} /> */}
//                 <NestedList items={item.children || []}  />
//               </div>
//             </details>
//           ) : (
//             <Link 
//               to={`${basePath}/${item.path}`} 
//               className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
//             >
//               <FaFileAlt size={16} />
//               <span>{item.name.replace('.md', '')}</span>
//             </Link>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// };

// const Sidebar = () => {
//   const { t } = useTranslation();
//   // const { data: structure, loading, error } = useCache('sidebar_structure', async () => {
//   //   const response = await fetch('/markdown/structure.json');
//   //   return response.json();
//   // }, 3600000); // 1 hour cache

//   // const renderedStructure = useMemo(() => {
//   //   if (loading) return <p>{t('loading')}</p>;
//   //   if (error) return <p>{t('errorLoadingStructure')}</p>;
//   //   return <NestedList items={structure} />;
//   // }, [structure, loading, error, t]);
//   const [structure, setStructure] = useState([]);

//   useEffect(() => {
//     const fetchStructure = async () => {
//       try {
//         const response = await fetch('/markdown/structure.json');
//         const data = await response.json();
//         setStructure(data);
//       } catch (error) {
//         console.error('Error fetching structure:', error);
//       }
//     };
//     fetchStructure();
//   }, []);

//   return (
//     <aside className="bg-gradient-to-r from-gray-100 to-gray-200 p-5 w-64 overflow-auto shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-purple-700 mb-4">{t('contents')}</h2>
//       {/* {renderedStructure} */}
//       {/* {fetchStructure} */}
//       <NestedList items={structure} />
//     </aside>
//   );
// };

// export default React.memo(Sidebar);


// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { PaginationContext } from '../contexts/PaginationContext';
// import { FaFolder, FaFolderOpen, FaFileAlt } from 'react-icons/fa';
// import { ThemeContext } from '../contexts/ThemeContext'; // افترض أنك قمت بإنشاء هذا السياق

// const NestedList = ({ items, basePath = '' }) => {
//   const location = useLocation();
//   const { setCurrentPage, setPreviousPage, setNextPage } = useContext(PaginationContext);
//   const { direction } = useContext(ThemeContext);
 

//   // console.log(direction);

//   useEffect(() => {
//     const currentIndex = items.findIndex(item => location.pathname.includes(item.path));
//     if (currentIndex !== -1) {
//       setCurrentPage(items[currentIndex].path);
//       setPreviousPage(currentIndex > 0 ? items[currentIndex - 1].path : null);
//       setNextPage(currentIndex < items.length - 1 ? items[currentIndex + 1].path : null);
//     }
//   }, [location.pathname, items, setCurrentPage, setPreviousPage, setNextPage]);

//   return (
//     <ul className={` ${direction === 'rtl' ? 'pr-2' : 'pl-2'}`}>
//       {items.map((item, index) => (
//         <li key={index} className="my-2">
//           {item.type === 'directory' ? (
//             <details className="group transition-all duration-300 ease-in-out">
//               <summary className={`cursor-pointer font-bold flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-200 ${direction === 'rtl' ? 'justify-start' : 'justify-start'}`}>
//                 <span className={` group-open:hidden ${direction === 'rtl' ? 'ml-2':''}`}>
//                   <FaFolder size={16} />
//                 </span>
//                 <span className="hidden group-open:inline">
//                   <FaFolderOpen size={16} />
//                 </span>
//                 <span>{item.name}</span>
//               </summary>
//               <div className={`mt-2  border-purple-300  transition-all duration-300 ease-in-out ${direction === 'rtl' ? 'mr-2 border-r-2 pr-2 ' : 'ml-4 border-l-2 pl-4'}`}>
//                 <NestedList items={item.children || []} />
//               </div>
//             </details>
//           ) : (
//             <Link 
//               to={`${basePath}/${item.path}`} 
//               className={`flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 ${direction === 'rtl' ? 'justify-start' : 'justify-start'}`}
//             >
//               <FaFileAlt size={16} className={`${direction === 'rtl' ? 'ml-2':''}`} />
//               <span>{item.name.replace('.md', '')}</span>
//             </Link>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// };

// const Sidebar = () => {
//   const { t } = useTranslation();
//   const [structure, setStructure] = useState([]);
//   const { direction } = useContext(ThemeContext);

//   useEffect(() => {
//     const fetchStructure = async () => {
//       try {
//         const response = await fetch('/markdown/structure.json');
//         const data = await response.json();
//         setStructure(data);
//       } catch (error) {
//         console.error('Error fetching structure:', error);
//       }
//     };
//     fetchStructure();
//   }, []);

//   return (
//     <aside className={`bg-gradient-to-r min-w-64 max-w-96 from-gray-100 to-gray-200 p-5 w-75 overflow-auto shadow-lg rounded-lg ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
//       <h2 className="text-2xl font-bold text-purple-700 mb-4">{t('contents')}</h2>
//       <NestedList items={structure} />
//     </aside>
//   );
// };

// export default React.memo(Sidebar);




















import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaChevronRight, FaChevronLeft, FaFolder, FaFolderOpen, FaFileAlt  } from 'react-icons/fa';
import { PaginationContext } from '../contexts/PaginationContext';
import { ThemeContext } from '../contexts/ThemeContext';


const NestedList = ({ items, basePath = '' }) => {
  const location = useLocation();
  const { setCurrentPage, setPreviousPage, setNextPage,setCurrentPageTitle, setPreviousPageTitle, setNextPageTitle } = useContext(PaginationContext);
  const { direction } = useContext(ThemeContext);
 

  // console.log(direction);

  useEffect(() => {
    const currentIndex = items.findIndex(item => location.pathname.includes(item.path));
    if (currentIndex !== -1) {
      setCurrentPage(items[currentIndex].path);
      setPreviousPage(currentIndex > 0 ? items[currentIndex - 1].path : null);
      setNextPage(currentIndex < items.length - 1 ? items[currentIndex + 1].path : null);
      setCurrentPageTitle(items[currentIndex].name);
      setPreviousPageTitle(currentIndex > 0 ? items[currentIndex - 1].name : null);
      setNextPageTitle(currentIndex < items.length - 1 ? items[currentIndex + 1].name : null);
    }
  }, [location.pathname, items, setCurrentPage, setPreviousPage, setNextPage,setCurrentPageTitle, setPreviousPageTitle, setNextPageTitle]);

  return (
    <ul className={` ${direction === 'rtl' ? 'pr-2' : 'pl-2'}`}>
      {items.map((item, index) => (
        <li key={index} className="my-2">
          {item.type === 'directory' ? (
            <details className="group transition-all duration-300 ease-in-out">
              <summary className={`cursor-pointer font-bold flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors duration-200 ${direction === 'rtl' ? 'justify-start' : 'justify-start'}`}>
                <span className={` group-open:hidden ${direction === 'rtl' ? 'ml-2':''}`}>
                  <FaFolder size={16} />
                </span>
                <span className="hidden group-open:inline">
                  <FaFolderOpen size={16} />
                </span>
                <span>{item.name}</span>
              </summary>
              <div className={`mt-2  border-purple-300  transition-all duration-300 ease-in-out ${direction === 'rtl' ? 'mr-2 border-r-2 pr-2 ' : 'ml-4 border-l-2 pl-4'}`}>
                <NestedList items={item.children || []} />
              </div>
            </details>
          ) : (
            <Link 
              to={`${basePath}/${item.path}`} 
              className={`flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 ${direction === 'rtl' ? 'justify-start' : 'justify-start'}`}
            >
              <FaFileAlt size={16} className={`${direction === 'rtl' ? 'ml-2':''}`} />
              <span>{item.name.replace('.md', '')}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

const Sidebar = () => {
  const { t } = useTranslation();
  const [structure, setStructure] = useState([]);
  const { direction } = useContext(ThemeContext);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const response = await fetch('/markdown/structure.json');
        // const response = await fetch('/html/structure.json');
        const data = await response.json();
        setStructure(data);
      } catch (error) {
        console.error('Error fetching structure:', error);
      }
    };
    fetchStructure();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="relative" dir={direction}>
      <button 
        onClick={toggleSidebar} 
        className="absolute z-10 -end-4 top-2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors duration-200"
        aria-label={t('toggleSidebar')}
      >
        {isSidebarVisible ? 
          (direction === 'ltr' ? <FaChevronLeft /> : <FaChevronRight />) 
          : 
          (direction === 'ltr' ? <FaChevronRight /> : <FaChevronLeft />)
        }
      </button>
      {isSidebarVisible && 
      <aside 
        className="bg-gradient-to-r h-full from-gray-100 to-gray-200 p-5 min-w-64 max-w-96 w-75 overflow-auto shadow-lg rounded-lg transition-all duration-300 ease-in-out" >
        <h2 className="text-2xl font-bold text-purple-700 mb-4">{t('contents')}</h2>
          <NestedList items={structure} />
      </aside>
      }
    </div>
  );
};

export default React.memo(Sidebar);