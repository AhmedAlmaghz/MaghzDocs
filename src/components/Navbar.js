import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Navbar = ({ menuItems = [] }) => {
  const { t } = useTranslation();

  const renderMenuItem = useCallback((item, index) => (
    <li key={index}>
      <Link 
        to={item.path} 
        className="hover:text-gray-300" 
        aria-label={t(`navAriaLabel.${item.label}`)}
      >
        {t(`nav.${item.label}`)}
      </Link>
    </li>
  ), [t]);

  return (
    <nav className="bg-primary text-white p-4" aria-label={t('mainNavigation')}>
      <ul className="flex space-x-4">
        {menuItems.map(renderMenuItem)}
      </ul>
    </nav>
  );
};

export default React.memo(Navbar);