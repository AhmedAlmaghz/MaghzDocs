import React, { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
// import Layout from '../components/Layout';
import Doc from '../components/Doc';
import Pagination from '../components/Pagination';
import SocialShare from '../components/SocialShare';
import { getMarkdownFiles, processMarkdown } from '../utils/markdown';

const Docs = () => {
  const [docs, setDocs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchDocs = async () => {
      const docsDir = '/markdown/docs';
      const files = await getMarkdownFiles(docsDir);
      const docsContent = await Promise.all(files.map(async (file) => {
        const content = await processMarkdown(file.path);
        return { title: file.name, content, slug: file.name.toLowerCase().replace(/ /g, '-') };
      }));
      setDocs(docsContent);
    };

    fetchDocs();
  }, []);

  const paginatedDocs = useMemo(() => {
    const docsPerPage = 5;
    const startIndex = (currentPage - 1) * docsPerPage;
    return docs.slice(startIndex, startIndex + docsPerPage);
  }, [docs, currentPage]);

  return (
    <>
      <Helmet>
        <title>{t('docs.title')}</title>
        <meta name="description" content={t('docs.description')} />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">{t('docs.header')}</h1>
      <Doc docs={paginatedDocs} />
      <Pagination 
        currentPage={currentPage} 
        totalPages={Math.ceil(docs.length / 5)} 
        basePath="/docs" 
        onPageChange={setCurrentPage}
      />
      <SocialShare url={window.location.href} title={t('docs.shareTitle')} />
    </>
  );
};

export default React.memo(Docs);