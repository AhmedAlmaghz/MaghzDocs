import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownContent from '../components/MarkdownContent';
import { processMarkdown } from '../utils/markdown';

const Page = () => {
  const {slug } = useParams();
  const [post, setPost] = useState({ frontmatter: {}, content: '' });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { frontmatter, content } = await processMarkdown(`/markdown/pages/${slug}.md`);
        setPost({ frontmatter, content });
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setPost({ frontmatter: {}, content: '# Error\nFailed to load content.' });
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{String(post.frontmatter.title).replace('_',' ')}</h1>
      <MarkdownContent content={post.content} />
    </div>
  );
};

export default Page;