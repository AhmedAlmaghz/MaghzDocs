import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const SocialShare = ({ url, title }) => {
  const { t } = useTranslation();

  const shareLinks = {
    facebook: {
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: <FaFacebook size={24} />,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    twitter: {
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: <FaTwitter size={24} />,
      color: 'bg-blue-400 hover:bg-blue-500',
    },
    linkedin: {
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      icon: <FaLinkedin size={24} />,
      color: 'bg-blue-700 hover:bg-blue-800',
    },
  };

  return (
    <div className="flex space-x-4 my-6">
      {Object.entries(shareLinks).map(([platform, { link, icon, color }]) => (
        <a
          key={platform}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-all duration-300 transform hover:scale-110 ${color} text-white p-3 rounded-full shadow-lg`}
          aria-label={t('shareOnAriaLabel', { platform })}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default React.memo(SocialShare);