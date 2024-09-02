import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Language from "./Language";
import Navbar from './Navbar';

const title="Maghz Docs";
const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl">{title}</h1>
      <Navbar />
      <nav aria-label={t('headerNavigation')}>
        <ul className="flex space-x-4 mt-2">
          {/* {pages.map((page, index) => (
            <li key={index}>
              <Link 
                to={`/pages/${page.name}`} 
                className="hover:text-gray-300"
                aria-label={t(`headerNavAriaLabel.${page.name}`)}
              >
                {t(`header.${page.name}`)}
              </Link>
            </li>
          ))} */}
          <li>
            <Link 
                to='/'
                className="hover:text-gray-300 p-5"
                // aria-label={t(`headerNavAriaLabel.${page.name}`)}
              >
                Home
            </Link>
          </li>
          <li>
            <Link 
                to='/pages/index'
                className="hover:text-gray-300 p-5"
                // aria-label={t(`headerNavAriaLabel.${page.name}`)}
              >
                Intro
            </Link>
          </li>
          <li>
            <Link 
                to='/pages/about'
                className="hover:text-gray-300 p-5"
                // aria-label={t(`headerNavAriaLabel.${page.name}`)}
              >
                About
            </Link>
          </li>
          <li>
            <Link 
                to='/settings'
                className="hover:text-gray-300 p-5"
                // aria-label={t(`headerNavAriaLabel.${page.name}`)}
              >
                Settings
            </Link>
          </li>
        </ul>
        <Language />
      </nav>
    </header>
  );
};

export default React.memo(Header);