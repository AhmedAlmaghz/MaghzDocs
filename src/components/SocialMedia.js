import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const links = [
  { url: 'https://facebook.com/MaghzDocs', icon: <FaFacebook color="#1877F2" />, platform: 'Facebook' },
  { url: 'https://x.com/MaghzDocs', icon: <FaTwitter color="#1DA1F2" />, platform: 'X (Twitter)' },
  { url: 'https://linkedin.com/in/MaghzDocs', icon: <FaLinkedin color="#0A66C2" />, platform: 'LinkedIn' },
  { url: 'https://youtube.com/MaghzDocs', icon: <FaYoutube color="#FF0000" />, platform: 'YouTube' }
];

const SocialMedia = () => {
  const { t } = useTranslation();

  return (
    <div className="flex space-x-4">
      {links.map((link, index) => (
        <a 
          key={index} 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={t('socialMediaAriaLabel', { platform: link.platform })}
          className="hover:opacity-80 transition duration-300 transform hover:-translate-y-1 hover:scale-110"
        >
          <span className="text-2xl">
            {link.icon}
          </span>
        </a>
      ))}
    </div>
  );
};

export default React.memo(SocialMedia);