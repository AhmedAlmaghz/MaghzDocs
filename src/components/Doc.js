import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Doc = ({ docs }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {docs.map((doc, index) => (
        <article key={index} className="border-b pb-4">
          <h2 className="text-2xl font-bold mb-2">{doc.title}</h2>
          <div className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: doc.excerpt }} />
          <Link to={`/docs/${doc.slug}`} className="text-blue-600 hover:underline">
            {t('readMore')}
          </Link>
        </article>
      ))}
    </div>
  );
};

export default React.memo(Doc);