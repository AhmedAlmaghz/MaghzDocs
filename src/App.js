import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import { PaginationProvider } from './contexts/PaginationContext';
import Pagination from './components/Pagination';

const Home = lazy(() => import('./pages/Home'));
const PageIndex = lazy(() => import('./pages/Index'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <PaginationProvider>
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<Loading />}>
            
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<PageIndex />} />
                 
                <Route path="/settings" element={<Settings />} />
              </Routes>
            
            </Suspense>
          </Layout>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
    </PaginationProvider>
  );
}

export default App;