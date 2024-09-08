import React from 'react';
import { useTranslation } from 'react-i18next';


const ErrorBoundary= ({ children }) => {
  const { t } = useTranslation();
  const [hasError, setHasError] = React.useState(false);

  const componentDidCatch = () => {
     setHasError(true);
  };

  if (hasError) {
      return (
        <div className="text-red-600 text-center p-4">
          <h1>{t('errorBoundary.title')}</h1>
          <p>{t('errorBoundary.message')}</p>
          <button onClick={() => window.location.reload()} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            {t('errorBoundary.reload')}
          </button>
        </div>
      );
    }

    return <>{children}</>;
  };
  
  export default ErrorBoundary;