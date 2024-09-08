import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaBook, FaInfoCircle, FaSearch } from 'react-icons/fa';
import RecentUpdates from '../components/RecentUpdates';
import SEO from '../components/SEO';

const Home = () => {
  const { t } = useTranslation();

  const recentUpdates = [
    { title: 'تحديث وثائق API', date: '2023-06-15', link: '/docs/api' },
    { title: 'إضافة قسم جديد للأسئلة الشائعة', date: '2023-06-10', link: '/faq' },
    { title: 'تحديث دليل البدء السريع', date: '2023-06-05', link: '/getting-started' },
  ];

  return (
    <>
      <SEO
        title={t('home.title')}
        description={t('home.description')}
        keywords={t('home.keywords')}
      />
      <div className="home-container">
        <h1 className="text-4xl font-bold mb-6 text-center">{t('home.welcome')}</h1>
        <p className="text-xl mb-8 text-center">{t('home.intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/pages/index" className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center">
            <FaBook className="text-3xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">{t('home.getStarted')}</h2>
              <p>{t('home.getStartedDesc')}</p>
            </div>
          </Link>
          <Link to="/pages/about" className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 flex items-center">
            <FaInfoCircle className="text-3xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">{t('home.about')}</h2>
              <p>{t('home.aboutDesc')}</p>
            </div>
          </Link>
          <Link to="/search" className="bg-purple-600 text-white p-6 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 flex items-center">
            <FaSearch className="text-3xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">{t('home.search')}</h2>
              <p>{t('home.searchDesc')}</p>
            </div>
          </Link>
        </div>
        <div className="mt-12">
          <RecentUpdates updates={recentUpdates} />
        </div>
      </div>
    </>
  );
};

export default React.memo(Home);