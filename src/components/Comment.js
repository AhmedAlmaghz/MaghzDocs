import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const Comment = ({ comments, onAddComment }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    onAddComment(data.comment);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <textarea
          {...register('comment', { required: t('commentRequired') })}
          className="w-full p-2 border rounded"
          placeholder={t('addComment')}
        />
        {errors.comment && <span className="text-red-500">{errors.comment.message}</span>}
        <button type="submit" className="mt-2 p-2 bg-blue-600 text-white rounded">
          {t('submit')}
        </button>
      </form>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <p key={index} className="bg-gray-100 p-2 rounded">{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Comment);