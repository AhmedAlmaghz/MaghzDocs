import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home'));
// const Docs = lazy(() => import('./pages/Docs'));
// const Blog = lazy(() => import('./pages/Blog'));
// const Page = lazy(() => import('./pages/Page'));
const PageIndex = lazy(() => import('./pages/Index'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<Loading />}>
            
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/docs/:slug" element={<Docs />} />
                <Route path="/blog/:slug" element={<Blog />} />
                <Route path="/pages/:slug" element={<Page />} /> */}
                <Route path="/*" element={<PageIndex />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            
            </Suspense>
          </Layout>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;