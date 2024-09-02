import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownContent from '../components/MarkdownContent';
import { processMarkdown } from '../utils/markdown';

const Doc = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({ frontmatter: {}, content: '' });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { frontmatter, content } = await processMarkdown(`/markdown/docs/${slug}.md`);
        setPost({ frontmatter, content });
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setPost({ frontmatter: {}, content: '# Error\nFailed to load content.' });
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <MarkdownContent content={post.content} />
    </div>
  );
};

export default Doc;