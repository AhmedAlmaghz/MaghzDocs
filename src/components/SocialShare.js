import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const SocialShare = ({ url, title }) => {
  const { t } = useTranslation();

  const shareLinks = {
    facebook: {
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: <FaFacebook />,
      color: 'text-blue-600 hover:text-blue-800',
    },
    twitter: {
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: <FaTwitter />,
      color: 'text-blue-400 hover:text-blue-600',
    },
    linkedin: {
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      icon: <FaLinkedin />,
      color: 'text-blue-700 hover:text-blue-900',
    },
  };

  return (
    <div className="flex space-x-4">
      {Object.entries(shareLinks).map(([platform, { link, icon, color }]) => (
        <a
          key={platform}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-transform transform hover:scale-110 ${color}`}
          aria-label={t('shareOnAriaLabel', { platform })}
        >
          <div className="p-2 bg-white rounded-full shadow-lg">
            {icon}
          </div>
        </a>
      ))}
    </div>
  );
};

export default React.memo(SocialShare);