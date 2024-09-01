import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const Search = ({ onSearch }) => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    onSearch(data.query);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <input
        type="text"
        {...register('query', { required: true })}
        className="p-2 border rounded-l flex-grow"
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchInput')}
      />
      <button 
        type="submit" 
        className="p-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-colors"
        aria-label={t('searchButton')}
      >
        {t('search')}
      </button>
    </form>
  );
};

export default React.memo(Search);