import React from 'react';
import { useTranslation } from 'react-i18next';

const SocialMedia = ({ links }) => {
  const { t } = useTranslation();

  return (
    <div className="flex space-x-4">
      {links.map((link, index) => (
        <a 
          key={index} 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:text-blue-800 transition-colors"
          aria-label={t('socialMediaAriaLabel', { platform: link.platform })}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default React.memo(SocialMedia);