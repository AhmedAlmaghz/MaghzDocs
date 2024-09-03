import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useSettings } from '../contexts/SettingsContext';
// import Notifications from './Notifications';

const Layout = ({ children }) => {
  const { settings } = useSettings();

  return (
    <div className={`flex flex-col min-h-screen ${settings.theme} ${settings.direction}`}>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main id="main-content" className="flex-1 p-4 overflow-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          {children}
        </main>
      </div>
      <Footer />
      {/* <Notifications /> */}
    </div>
  );
};

export default Layout;