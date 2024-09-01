import React from 'react';
import { useTranslation } from 'react-i18next';

const GitHubShare = ({ repoUrl }) => {
  const { t } = useTranslation();

  return (
    <div className="flex space-x-4">
      <a 
        href={`${repoUrl}/edit/main/path/to/file`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:text-blue-800"
        aria-label={t('editOnGitHubAriaLabel')}
      >
        {t('editOnGitHub')}
      </a>
      <a 
        href={`${repoUrl}/share`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:text-blue-800"
        aria-label={t('shareAriaLabel')}
      >
        {t('share')}
      </a>
    </div>
  );
};

export default React.memo(GitHubShare);