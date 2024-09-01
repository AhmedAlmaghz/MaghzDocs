import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Theme from './components/Theme';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Theme>
        <App />
      </Theme>
    </I18nextProvider>
  </React.StrictMode>
);