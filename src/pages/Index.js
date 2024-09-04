import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MarkdownContent from '../components/MarkdownContent';
import processMarkdown from '../utils/markdown';
import ScrollButtons from '../components/ScrollButtons';
import SocialShare from '../components/SocialShare';
import Pagination from '../components/Pagination';
// import SkeletonLoader from '../components/SkeletonLoader';
// import Comments from '../components/Comments';
// import TableOfContents from '../components/TableOfContents';

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
      <div className="mx-auto px-16 py-8">
        <SharePage url={window.location.href} title={title} />
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        
        <MarkdownContent id="MarkdownContent" content={memoizedPost.content} />
        
        {/* <TableOfContents htmlContent={`${document.getElementsByName('MarkdownContent')}`} /> */}
        <div className="flex flex-row items-center justify-center m-8 space-x-2">
            <div className="flex items-center space-x-2">
                <SocialShare />
                {/* <Rating onRate={(rating) => console.log('Rated:', rating)} /> */}
            </div>
        </div>
       

        <div className="mt-8">
          <Pagination />
        </div>
        {/* <Comments postId={slug} /> */}
        <ScrollButtons />
      </div>
    </>
  );
};

export default React.memo(PageIndex);