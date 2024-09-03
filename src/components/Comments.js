import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Comments = ({ postId }) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">{t('comments')}</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={t('writeComment')}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {t('submitComment')}
        </button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-md">
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;