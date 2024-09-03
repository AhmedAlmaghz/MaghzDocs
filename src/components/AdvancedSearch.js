import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useDebounce from '../hooks/useDebounce';
import { FaSearch } from 'react-icons/fa';

const AdvancedSearch = ({ onSearch }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ term: debouncedSearchTerm, category });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('advancedSearch')}</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full p-2 pl-10 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="all">{t('allCategories')}</option>
            <option value="docs">{t('documentation')}</option>
            <option value="tutorials">{t('tutorials')}</option>
            <option value="articles">{t('articles')}</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {t('search')}
        </button>
      </form>
    </div>
  );
};

export default React.memo(AdvancedSearch);