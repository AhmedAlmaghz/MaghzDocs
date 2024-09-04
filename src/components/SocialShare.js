import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { FaGithub, FaEdit, FaPrint, FaFacebook, FaTwitter, FaLinkedin, FaCodeBranch, FaFilePdf } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { ThemeContext } from '../contexts/ThemeContext';
import html2pdf from 'html2pdf.js';

const repoUrl = 'https://github.com/AhmedAlmaghz/MaghzDocs';

const SocialShare = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const slug = location.pathname;
  const { direction } = useContext(ThemeContext);

  const shareLinks = {
    facebook: {
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      icon: <FaFacebook size={24} />,
      color: 'bg-blue-600 hover:bg-blue-700',
      tooltip: t('shareOnFacebook'),
    },
    twitter: {
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`,
      icon: <FaTwitter size={24} />,
      color: 'bg-blue-400 hover:bg-blue-500',
      tooltip: t('shareOnTwitter'),
    },
    linkedin: {
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(document.title)}`,
      icon: <FaLinkedin size={24} />,
      color: 'bg-blue-700 hover:bg-blue-800',
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
    <div className="flex flex-wrap gap-4">
      <a
        href={`${repoUrl}/edit/main/public/markdown/${slug}.md`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-2 text-white bg-green-600 hover:bg-green-700 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
        data-tooltip-id="tooltip"
        data-tooltip-content={t('editOnGitHub')}
      >
        <FaEdit size={24} className="transition-colors duration-300 text-white" />
      </a>
      <a
        href={`${repoUrl}/fork`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-2 text-white bg-purple-600 hover:bg-purple-700 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
        data-tooltip-id="tooltip"
        data-tooltip-content={t('Fork')}
      >
        <FaCodeBranch size={24} className="transition-colors duration-300 text-white" />
      </a>
      <a
        href={`${repoUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-2 text-white bg-gray-800 hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
        data-tooltip-id="tooltip"
        data-tooltip-content={t('GitHub')}
      >
        <FaGithub size={24} className="transition-colors duration-300 text-white" />
      </a>
      <button
        onClick={handlePrint}
        className="flex items-center justify-center space-x-2 text-white bg-yellow-600 hover:bg-yellow-700 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
        data-tooltip-id="tooltip"
        data-tooltip-content={t('print')}
      >
        <FaPrint size={24} className="transition-colors duration-300 text-white" />
      </button>
      <button
        onClick={handleDownloadPDF}
        className="flex items-center justify-center space-x-2 text-white bg-red-600 hover:bg-red-700 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
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
          className={`flex items-center justify-center space-x-2 ${color} text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${direction === 'rtl' ? 'ml-4' : ''}`}
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

// import React, { useContext, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useLocation } from 'react-router-dom';
// import { FaGithub, FaEdit, FaPrint, FaFacebook, FaTwitter, FaLinkedin, FaCodeBranch, FaFilePdf } from 'react-icons/fa';
// import { Tooltip } from 'react-tooltip';
// import { ThemeContext } from '../contexts/ThemeContext';
// import html2pdf from 'html2pdf.js';
// import markdownIt from 'markdown-it';
// import pdf from 'html-pdf';

// const repoUrl = 'https://github.com/AhmedAlmaghz/MaghzDocs';

// const SocialShare = () => {
//   const { t } = useTranslation();
//   const location = useLocation();
//   const slug = location.pathname;
//   const { direction } = useContext(ThemeContext);
//   const markdownContentRef = useRef(null);

//   const shareLinks = {
//     facebook: {
//       link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
//       icon: <FaFacebook size={24} />,
//       color: 'bg-blue-600 hover:bg-blue-700',
//       tooltip: t('shareOnFacebook'),
//     },
//     twitter: {
//       link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`,
//       icon: <FaTwitter size={24} />,
//       color: 'bg-blue-400 hover:bg-blue-500',
//       tooltip: t('shareOnTwitter'),
//     },
//     linkedin: {
//       link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(document.title)}`,
//       icon: <FaLinkedin size={24} />,
//       color: 'bg-blue-700 hover:bg-blue-800',
//       tooltip: t('shareOnLinkedIn'),
//     },
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDownloadPDF = () => {
//     const element = document.documentElement;
//     html2pdf().from(element).save();
//   };

//   const handleDownloadMarkdownPDF = async () => {
//     if (markdownContentRef.current) {
//       const md = markdownIt();
//       const htmlContent = md.render(markdownContentRef.current.innerText);

//       const options = { format: 'Letter' };
//       pdf.create(htmlContent, options).toBuffer((err, buffer) => {
//         if (err) {
//           console.error('Error creating PDF:', err);
//         } else {
//           const blob = new Blob([buffer], { type: 'application/pdf' });
//           const url = URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = 'document.pdf';
//           document.body.appendChild(a);
//           a.click();
//           document.body.removeChild(a);
//           URL.revokeObjectURL(url);
//         }
//       });
//     }
//   };

//   return (
//     <div className="flex flex-wrap gap-4">
//       <a
//         href={`${repoUrl}/edit/main/public/markdown/${slug}.md`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center justify-center space-x-2 text-white bg-green-600 hover:bg-green-700 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
//         data-tooltip-id="tooltip"
//         data-tooltip-content={t('editOnGitHub')}
//       >
//         <FaEdit size={24} className="transition-colors duration-300 text-white" />
//       </a>
//       <a
//         href={`${repoUrl}/fork`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center justify-center space-x-2 text-white bg-purple-600 hover:bg-purple-700 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
//         data-tooltip-id="tooltip"
//         data-tooltip-content={t('Fork')}
//       >
//         <FaCodeBranch size={24} className="transition-colors duration-300 text-white" />
//       </a>
//       <a
//         href={`${repoUrl}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center justify-center space-x-2 text-white bg-gray-800 hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
//         data-tooltip-id="tooltip"
//         data-tooltip-content={t('GitHub')}
//       >
//         <FaGithub size={24} className="transition-colors duration-300 text-white" />
//       </a>
//       <button
//         onClick={handlePrint}
//         className="flex items-center justify-center space-x-2 text-white bg-yellow-600 hover:bg-yellow-700 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
//         data-tooltip-id="tooltip"
//         data-tooltip-content={t('print')}
//       >
//         <FaPrint size={24} className="transition-colors duration-300 text-white" />
//       </button>
//       <button
//         onClick={handleDownloadPDF}
//         className="flex items-center justify-center space-x-2 text-white bg-red-600 hover:bg-red-700 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
//         data-tooltip-id="tooltip"
//         data-tooltip-content={t('downloadPDF')}
//       >
//         <FaFilePdf size={24} className="transition-colors duration-300 text-white" />
//       </button>
//       <button
//         onClick={handleDownloadMarkdownPDF}
//         className="flex items-center justify-center space-x-2 text-white bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
//         data-tooltip-id="tooltip"
//         data-tooltip-content={t('downloadMarkdownPDF')}
//       >
//         <FaFilePdf size={24} className="transition-colors duration-300 text-white" />
//       </button>
//       {Object.entries(shareLinks).map(([platform, { link, icon, color, tooltip }]) => (
//         <a
//           key={platform}
//           href={link}
//           target="_blank"
//           rel="noopener noreferrer"
//           className={`flex items-center justify-center space-x-2 ${color} text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${direction === 'rtl' ? 'ml-4' : ''}`}
//           data-tooltip-id="tooltip"
//           data-tooltip-content={tooltip}
//         >
//           {icon}
//         </a>
//       ))}
//       <Tooltip id="tooltip" place="top" type="dark" effect="solid" />
//     </div>
//   );
// };

// export default React.memo(SocialShare);