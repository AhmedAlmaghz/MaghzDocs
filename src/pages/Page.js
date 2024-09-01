import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
// import Layout from '../components/Layout';
import { getMarkdownFiles, processMarkdown } from '../utils/markdown';

const Page = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const { pageName } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPage = async () => {
      const pagesDir = '/markdown/pages';
      const files = await getMarkdownFiles(pagesDir);
      const pageFile = files.find(file => file.name.toLowerCase() === pageName);
      if (pageFile) {
        const pageContent = await processMarkdown(pageFile.path);
        setContent(pageContent);
        setTitle(pageFile.name);
      }
    };

    fetchPage();
  }, [pageName]);

  return (
    <>
      <Helmet>
        <title>{title} | {t('site.name')}</title>
        <meta name="description" content={t('page.description', { page: title })} />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

export default React.memo(Page);