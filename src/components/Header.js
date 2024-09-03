import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Search from './Search';
import SocialMedia from './SocialMedia';
import Theme from './Theme';
import { FaHome, FaInfoCircle, FaCog, FaBook } from 'react-icons/fa'; // استيراد الأيقونات
import logo from '../logo192.png'; // افترض أن الشعار موجود في هذا المسار

const title = "Maghz Docs";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-5 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Maghz Docs Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-3xl font-bold tracking-wider">{title}</h1>
        </div>
        <Theme />
      </div>
      <Navbar />
      <nav aria-label={t('headerNavigation')} className="mt-4">
        <ul className="flex space-x-6">
          <li>
            <Link 
              to='/' 
              className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300"
            >
              <FaHome size={20} />
              <span>{t('Home')}</span>
            </Link>
          </li>
          <li>
            <Link 
              to='/pages/index' 
              className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300"
            >
              <FaBook size={20} />
              <span>{t('Intro')}</span>
            </Link>
          </li>
          <li>
            <Link 
              to='/pages/about' 
              className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300"
            >
              <FaInfoCircle size={20} />
              <span>{t('About')}</span>
            </Link>
          </li>
          <li>
            <Link 
              to='/settings' 
              className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300"
            >
              <FaCog size={20} />
              <span>{t('Settings')}</span>
            </Link>
          </li>
          <li>
            <SocialMedia className='items-left'/>
          </li>
        </ul>
        <div className="mt-4">
          <Search />
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);