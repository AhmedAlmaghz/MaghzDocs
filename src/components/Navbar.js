import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHome, FaInfoCircle, FaCog, FaBook, FaSearch } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';



const Navbar = () => {
  const { t } = useTranslation();
  const { direction } = useContext(ThemeContext);
  

  return (
    <nav aria-label={t('headerNavigation')} className="mt-4">
          <ul className="flex flex-wrap justify-center space-x-6">
            <li>
              <Link 
                to='/' 
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300 "
              >
                <FaHome size={20} />
                <span className={`${direction==='rtl'? 'pr-3':''} `} >{t('Home')}</span>
              </Link>
            </li>
            <li>
              <Link 
                to='/pages/index' 
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300 "
              >
                <FaBook size={20} />
                <span className={`${direction==='rtl'? 'pr-3':''} `} >{t('Intro')}</span>
              </Link>
            </li>
            <li>
              <Link 
                to='/pages/about' 
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300 "
              >
                <FaInfoCircle size={20} />
                <span className={`${direction==='rtl'? 'pr-3':''} `} >{t('About')}</span>
              </Link>
            </li>
            <li>
              <Link 
                to='/settings' 
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300 "
              >
                <FaCog size={20} />
                <span className={`${direction==='rtl'? 'pr-3':''} `} >{t('Settings')}</span>
              </Link>
            </li>
            <li>
            <Link 
              to='/search' 
              className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300 "
            >
              <FaSearch size={20} />
              <span className={`${direction==='rtl'? 'pr-3':''} `} >{t('AdvancedSearch')}</span>
            </Link>
          </li>
          </ul>
        </nav>
  );
};

export default React.memo(Navbar);