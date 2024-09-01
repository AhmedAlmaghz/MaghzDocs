import React, { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
// import Layout from '../components/Layout';
import BlogComponent from '../components/Blog';
import Pagination from '../components/Pagination';
import SocialShare from '../components/SocialShare';
import { processMarkdown, getMarkdownFiles } from '../utils/markdown';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPosts = async () => {
      const blogDir = '/markdown/blog';
      const files = await getMarkdownFiles(blogDir);
      const postsContent = await Promise.all(files.map(async (file) => {
        const content = await processMarkdown(file.path);
        return { title: file.name, content, slug: file.name.toLowerCase().replace(/ /g, '-') };
      }));
      setPosts(postsContent);
    };

    fetchPosts();
  }, []);

  const paginatedPosts = useMemo(() => {
    const postsPerPage = 5;
    const startIndex = (currentPage - 1) * postsPerPage;
    return posts.slice(startIndex, startIndex + postsPerPage);
  }, [posts, currentPage]);

  return (
    <>
      <Helmet>
        <title>{t('blog.title')}</title>
        <meta name="description" content={t('blog.description')} />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">{t('blog.header')}</h1>
      <BlogComponent posts={paginatedPosts} />
      <Pagination 
        currentPage={currentPage} 
        totalPages={Math.ceil(posts.length / 5)} 
        basePath="/blog" 
        onPageChange={setCurrentPage}
      />
      <SocialShare url={window.location.href} title={t('blog.shareTitle')} />
    </>
  );
};

export default React.memo(BlogPage);