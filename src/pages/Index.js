import React, { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import MarkdownContent from '../components/MarkdownContent';
import processMarkdown from '../utils/markdown';

const PageIndex = () => {
  const [post, setPost] = useState({ frontmatter: {}, content: '' });
  const location = useLocation();
  const slug = location.pathname; // المسار الكامل
  
  useEffect(() => {
    const filePath='/markdown/'+slug+'.md';
    console.log(filePath);
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
      console.log('OK Slug'+slug);
    }
  }, [slug]); // فقط slug هي التبعية اللازمة

  // setFilepath('/markdown/'+slug+'.md');
  // console.log(filepath);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{String(post.frontmatter.title).replace('_', ' ')}</h1>
      <MarkdownContent content={post.content} />
    </div>
  );
};

export default React.memo(PageIndex);