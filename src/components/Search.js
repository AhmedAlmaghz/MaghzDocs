import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaSpinner } from 'react-icons/fa';

const Search = ({ onSearch }) => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const [isSearching, setIsSearching] = useState(false);

  const onSubmit = async (data) => {
    setIsSearching(true);
    await onSearch(data.query);
    setIsSearching(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <input
        type="text"
        {...register('query', { required: true })}
        className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchInput')}
      />
      <button 
        type="submit" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
        aria-label={t('searchButton')}
        disabled={isSearching}
      >
        {isSearching ? <FaSpinner className="animate-spin" size={18} /> : <FaSearch size={18} />}
      </button>
    </form>
  );
};

export default React.memo(Search);