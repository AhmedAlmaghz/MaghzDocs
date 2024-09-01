import React from 'react';
import { useTranslation } from 'react-i18next';

const SocialShare = ({ url, title }) => {
  const { t } = useTranslation();

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  };

  return (
    <div className="flex space-x-4">
      {Object.entries(shareLinks).map(([platform, link]) => (
        <a 
          key={platform}
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:text-blue-800 transition-colors"
          aria-label={t('shareOnAriaLabel', { platform })}
        >
          {t(`shareOn${platform.charAt(0).toUpperCase() + platform.slice(1)}`)}
        </a>
      ))}
    </div>
  );
};

export default React.memo(SocialShare);