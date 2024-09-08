import React,{useContext} from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Search from './Search';
import SocialMedia from './SocialMedia';
import Theme from './Theme';
import logo from '../logo192.png';
import { ThemeContext } from '../contexts/ThemeContext';


const title = "Maghz Docs";

const Header = () => {
  const { t } = useTranslation();
  const { direction } = useContext(ThemeContext);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Maghz Docs Logo" className="w-12 h-12 rounded-full border-2 border-white" />
            <h1 className={` text-3xl font-bold tracking-wider -pb-5 ${direction==='rtl'? 'pr-4':''} `}>{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Theme />
          </div>
        </div>
        <Navbar />
        
        <div className="mt-4">
          <Search />
        </div>
        <div className="mt-4 flex justify-center">
          <SocialMedia />
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);