import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SocialMedia from './SocialMedia';
import { FaHome, FaInfoCircle, FaCog, FaBook } from 'react-icons/fa'; // استيراد الأيقونات

const Footer = ({ pages = [] }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white p-6 text-center shadow-lg">
      <nav aria-label={t('footerNavigation')}>
        <ul className="flex flex-wrap justify-center space-x-6">
          {pages.map((page, index) => (
            <li key={index} className="mb-2">
              <Link 
                to={`/pages/${page.name}`} 
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300"
              >
                {page.name === 'home' && <FaHome size={16} />}
                {page.name === 'intro' && <FaBook size={16} />}
                {page.name === 'about' && <FaInfoCircle size={16} />}
                {page.name === 'settings' && <FaCog size={16} />}
                <span>{t(`footer.${page.name}`)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-4">
        <SocialMedia />
      </div>
      <p className="mt-6 text-sm opacity-75">
        {t('Copyright for MaghzDocs by @AhmedAlmaghz', { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
};

export default React.memo(Footer);