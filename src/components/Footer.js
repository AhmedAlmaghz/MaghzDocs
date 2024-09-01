import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = ({ pages = [] }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-200 p-4 text-center">
      <nav aria-label={t('footerNavigation')}>
        <ul className="flex flex-wrap justify-center space-x-4">
          {pages.map((page, index) => (
            <li key={index}>
              <Link to={`/pages/${page.name}`} className="hover:text-gray-600">
                {t(`footer.${page.name}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-4">{t('copyright', { year: new Date().getFullYear() })}</p>
    </footer>
  );
};

export default React.memo(Footer);