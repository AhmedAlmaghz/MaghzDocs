import React from 'react';
import Header from './Header';
// import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useSettings } from '../contexts/SettingsContext';

const Layout = ({ children }) => {
  const { settings } = useSettings();

  return (
    <div className={`flex flex-col min-h-screen ${settings.theme}`} dir={settings.direction}>
      <Header />
        {/* <Navbar /> */}
 
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;