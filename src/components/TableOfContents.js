import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TableOfContents = () => {
  const { t } = useTranslation();
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5')).map((element, index) => {
      if (!element.id) {
        element.id = `heading-${index}`;
      }
      return {
        id: element.id,
        text: element.textContent,
        level: Number(element.tagName.substring(1))
      };
    });
    setHeadings(elements);
  }, []);

  return (
    <nav className="toc">
      <h2 className="text-xl font-bold mb-4">{t('tableOfContents')}</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={`ml-${(heading.level - 2) * 4}`}>
            <a
              href={`#${heading.id}`}
              className="text-blue-500 hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;