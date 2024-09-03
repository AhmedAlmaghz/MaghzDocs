import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MarkdownContent from '../components/MarkdownContent';
import processMarkdown from '../utils/markdown';
import ScrollButtons from '../components/ScrollButtons';
import SocialShare from '../components/SocialShare';
import Pagination from '../components/Pagination';
import SkeletonLoader from '../components/SkeletonLoader';
import Comments from '../components/Comments';
import TableOfContents from '../components/TableOfContents';
import PrintButton from '../components/PrintButton';
import SharePage from '../components/SharePage';
import Rating from '../components/Rating';
// import useCache from '../hooks/useCache';

const PageIndex = () => {
  // const location = useLocation();
  // const slug = location.pathname;
  // const { data: post, loading: isLoading, error } = useCache(
  //   `post_${slug}`,
  //   () => processMarkdown(`/markdown/${slug}.md`),
  //   3600000 // 1 hour cache
  // );

  // const [title, setTitle] = useState('');

  // useEffect(() => {
  //   if (post) {
  //     setTitle(String(post.frontmatter.title).replace('_', ' '));
  //   }
  // }, [post]);
  const [post, setPost] = useState({ frontmatter: {}, content: '' });
  const location = useLocation();
  const slug = location.pathname; // المسار الكامل
  
  useEffect(() => {
    const filePath='/markdown/'+slug+'.md';
    const fetchPost = async () => {
      try {
        const { frontmatter, content } = await processMarkdown(filePath);
        setPost({ frontmatter, content });
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setPost({ frontmatter: {}, content: '# Error\nFailed to load content.' });
      }
    };

    if (slug) { // تأكد من أن المعلمة slug معرفة
      fetchPost();
    }
  }, [slug]); // فقط slug هي التبعية اللازمة

  const memoizedPost = useMemo(() => post, [post]);
  // // console.log(post.frontmatter.title);
  // console.log(post);

  const title=String(post.frontmatter.title).replace('_', ' ');

  // if (isLoading) return <SkeletonLoader />;
  // if (error) return <div className="text-red-600 text-center p-4">{error.message}</div>;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={memoizedPost.frontmatter.description || ''} />
      </Helmet>
      {/* <div className="max-w-3xl mx-auto px-4 py-8"> */}
      <div className="mx-auto px-4 py-8">
        <SharePage url={window.location.href} title={title} />
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <TableOfContents />
        <MarkdownContent content={memoizedPost.content} />
        <ScrollButtons />
        <div className="mt-8">
          <PrintButton />
          <Rating onRate={(rating) => console.log('Rated:', rating)} />
          <SocialShare url={window.location.href} title={title} />
        </div>
        <div className="mt-8">
          <Pagination />
        </div>
        <Comments postId={slug} />
      </div>
    </>
  );
};

export default React.memo(PageIndex);