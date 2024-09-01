import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMarkdownFiles } from '../utils/markdown';

const Sidebar = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const blogPages = await getMarkdownFiles('/markdown/blog');
        const docPages = await getMarkdownFiles('/markdown/docs');
        const staticPages = await getMarkdownFiles('/markdown/pages');
        console.log(staticPages);
        
        setPages([
          { title: 'Blog', items: blogPages },
          { title: 'Docs', items: docPages },
          { title: 'Pages', items: staticPages },
        ]);
      } catch (error) {
        console.error('Error fetching pages:', error);
        setPages([]);
      }
    };

    fetchPages();
  }, []);

  return (
    <aside className="bg-gray-100 p-4 w-64">
      {pages.map((section) => (
        <div key={section.title}>
          <h3 className="font-bold mb-2">{section.title}</h3>
          {Array.isArray(section.items) ? (
            <ul>
              {section.items.map((page) => (
                <li key={page.name}>
                  <Link to={`/${section.title.toLowerCase()}/${page.name}`} className="hover:text-blue-600">
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items available</p>
          )}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;