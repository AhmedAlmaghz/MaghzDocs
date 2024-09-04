import React,{useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';

const SharePage = ({ url, title }) => {
  const { t } = useTranslation();
  const { direction } = useContext(ThemeContext);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebook />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    }
  ];

  return (
    <div className="flex space-x-4">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={` text-gray-600 hover:text-blue-500 transition duration-300 ${direction==='rtl'? 'ml-4' :''} `}
          aria-label={t('shareTo', { platform: link.name })}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SharePage;