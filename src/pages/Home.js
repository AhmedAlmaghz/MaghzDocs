import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
// import Layout from '../components/Layout';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">{t('home.welcome')}</h1>
      <p className="text-lg">{t('home.intro')}</p>
    </>
  );
};

export default React.memo(Home);