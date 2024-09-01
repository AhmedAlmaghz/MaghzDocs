import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = ({ title, pages }) => {
  const { t } = useTranslation();

  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl">{title}</h1>
      <nav aria-label={t('headerNavigation')}>
        <ul className="flex space-x-4 mt-2">
          {pages.map((page, index) => (
            <li key={index}>
              <Link 
                to={`/pages/${page.name}`} 
                className="hover:text-gray-300"
                aria-label={t(`headerNavAriaLabel.${page.name}`)}
              >
                {t(`header.${page.name}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default React.memo(Header);