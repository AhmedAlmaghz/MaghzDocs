import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RecentUpdates = ({ updates }) => {
  const { t } = useTranslation();

  return (
    <div className="recent-updates dark:bg-gray-300 dark:text-gray-800">
      <h2 className="text-2xl font-bold mb-4">{t('recentUpdates')}</h2>
      <ul className="space-y-4">
        {updates.map((update, index) => (
          <li key={index} className="border-b pb-2 last:border-b-0">
            <Link to={update.link} className="hover:text-blue-500 transition duration-300">
              <h3 className="font-semibold">{update.title}</h3>
              <p className="text-sm text-gray-600">{update.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentUpdates;