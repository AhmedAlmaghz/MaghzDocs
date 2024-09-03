import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SocialMedia from './SocialMedia';
import { FaHome, FaInfoCircle, FaCog, FaBook, FaSearch } from 'react-icons/fa';

const Footer = ({ pages = [] }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-blue-800 via-purple-800 to-pink-800 text-white py-10 px-6 shadow-lg">
      <div className="container mx-auto">
        <nav aria-label={t('footerNavigation')} className="mb-8">
          <ul className="flex flex-wrap justify-center space-x-8">
            {pages.map((page, index) => (
              <li key={index} className="mb-4">
                <Link 
                  to={`/pages/${page.name}`} 
                  className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300"
                >
                  {page.name === 'home' && <FaHome size={16} />}
                  {page.name === 'intro' && <FaBook size={16} />}
                  {page.name === 'about' && <FaInfoCircle size={16} />}
                  {page.name === 'settings' && <FaCog size={16} />}
                  {page.name === 'search' && <FaSearch size={16} />}
                  <span>{t(`footer.${page.name}`)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex justify-center mt-8">
          <SocialMedia />
        </div>
        <p className="mt-8 text-sm opacity-75 text-center">
          {t('Copyright for MaghzDocs by @AhmedAlmaghz', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);