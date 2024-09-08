import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { FaGithub, FaEdit, FaPrint, FaFacebook, FaTwitter, FaLinkedin, FaCodeBranch, FaFilePdf } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { ThemeContext } from '../contexts/ThemeContext';
import html2pdf from 'html2pdf.js';

const repoUrl = process.env.REACT_APP_GITHUB_REPO_URL;

const SocialShare = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const slug = location.pathname;
  const { direction } = useContext(ThemeContext);

  const shareLinks = {
    facebook: {
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      icon: <FaFacebook size={24} />,
      color: 'social-share-button-facebook',
      tooltip: t('shareOnFacebook'),
    },
    twitter: {
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`,
      icon: <FaTwitter size={24} />,
      color: 'social-share-button-twitter',
      tooltip: t('shareOnTwitter'),
    },
    linkedin: {
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(document.title)}`,
      icon: <FaLinkedin size={24} />,
      color: 'social-share-button-linkedin',
      tooltip: t('shareOnLinkedIn'),
    },
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = document.documentElement;
    html2pdf().from(element).save();
  };

  return (
    <div className="social-share">
      <a
        href={`${repoUrl}/edit/main/public/markdown/${slug}.md`}
        target="_blank"
        rel="noopener noreferrer"
        className="social-share-button social-share-button-edit"
        data-tooltip-id="tooltip"
        data-tooltip-content={t('editOnGitHub')}
      >
        <FaEdit size={24} className="transition-colors duration-300 text-white" />
      </a>
      <a
        href={`${repoUrl}/fork`}
        target="_blank"
        rel="noopener noreferrer"
        className="social-share-button social-share-button-fork"
        data-tooltip-id="tooltip"
        data-tooltip-content={t('Fork')}
      >
        <FaCodeBranch size={24} className="transition-colors duration-300 text-white" />
      </a>
      <a
        href={`${repoUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="social-share-button social-share-button-github"
        data-tooltip-id="tooltip"
        data-tooltip-content={t('GitHub')}
      >
        <FaGithub size={24} className="transition-colors duration-300 text-white" />
      </a>
      <button
        onClick={handlePrint}
        className="social-share-button social-share-button-print"
        data-tooltip-id="tooltip"
        data-tooltip-content={t('print')}
      >
        <FaPrint size={24} className="transition-colors duration-300 text-white" />
      </button>
      <button
        onClick={handleDownloadPDF}
        className="social-share-button social-share-button-pdf"
        data-tooltip-id="tooltip"
        data-tooltip-content={t('downloadPDF')}
      >
        <FaFilePdf size={24} className="transition-colors duration-300 text-white" />
      </button>
      {Object.entries(shareLinks).map(([platform, { link, icon, color, tooltip }]) => (
        <a
          key={platform}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-share-button ${color} ${direction === 'rtl' ? 'ml-4' : ''}`}
          data-tooltip-id="tooltip"
          data-tooltip-content={tooltip}
        >
          {icon}
        </a>
      ))}
      <Tooltip id="tooltip" place="top" type="dark" effect="solid" />
    </div>
  );
};

export default React.memo(SocialShare);