import React, { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import MarkdownContent from '../components/MarkdownContent';
import processMarkdown from '../utils/markdown';
import ScrollButtons  from '../components/ScrollButtons';
import SocialShare from '../components/SocialShare';
import Pagination from '../components/Pagination';

const PageIndex = () => {
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

  const title=String(post.frontmatter.title).replace('_', ' ');

  return (
    <div className="max-w-3xl mx-auto">
      <SocialShare url={slug} title={title}/>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <MarkdownContent content={post.content} />
      <ScrollButtons />
      <SocialShare url={slug} title={title}/>
      <Pagination />
    </div>
  );
};

export default React.memo(PageIndex);