import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Rating = ({ initialRating = 0, onRate }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => {
                  setRating(ratingValue);
                  onRate(ratingValue);
                }}
                className="hidden"
              />
              <FaStar
                className="cursor-pointer transition duration-200"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={32}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <p className="mt-2">{t('ratingText', { rating })}</p>
    </div>
  );
};

export default Rating;