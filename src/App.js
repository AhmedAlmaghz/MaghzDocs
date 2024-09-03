import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import { PaginationProvider } from './contexts/PaginationContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import SkipToContent from './components/SkipToContent';

const Home = lazy(() => import('./pages/Home'));
const PageIndex = lazy(() => import('./pages/Index'));
const Settings = lazy(() => import('./pages/Settings'));
const AdvancedSearch = lazy(() => import('./components/AdvancedSearch'));

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <SettingsProvider>
          <ThemeProvider>
            <PaginationProvider>
              <BrowserRouter>
                <SkipToContent />
                <Layout>
                  <Suspense fallback={<Loading />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/*" element={<PageIndex />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/search" element={<AdvancedSearch />} />
                    </Routes>
                  </Suspense>
                </Layout>
              </BrowserRouter>
            </PaginationProvider>
          </ThemeProvider>
        </SettingsProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;