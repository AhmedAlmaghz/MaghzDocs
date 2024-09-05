import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MarkdownContent from '../components/MarkdownContent';
import processMarkdown from '../utils/markdown';
import ScrollButtons from '../components/ScrollButtons';
import SocialShare from '../components/SocialShare';
import Pagination from '../components/Pagination';
import SharePage from '../components/SharePage';
import Rating from '../components/Rating';

const PageIndexGithub = () => {
  const location = useLocation();
  const slug = location.pathname;
  const [post, setPost] = useState({ frontmatter: {}, content: '' });

  useEffect(() => {
    const fetchPostFromGitHub = async () => {
      const repoOwner = 'AhmedAlmaghz'; // اسم مالك المستودع
      const repoName = 'transformers'; // اسم المستودع
      const branch = 'Add_docs_source_ar__toctree.yml'; // الفرع الذي تريد القراءة منه
      const folderPath = 'docs/source/ar'; // مسار المجلد الذي يحتوي على ملفات Markdown
      const filePath = `${folderPath}${slug}.md`;

      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
          {
            headers: {
              'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}` // توكن GitHub الشخصي للمصادقة
            },
            params: {
              ref: branch
            }
          }
        );

        const content = atob(response.data.content); // Decode the base64 content
        const { frontmatter, content: markdownContent } = processMarkdown(content);
        setPost({ frontmatter, content: markdownContent });
      } catch (error) {
        console.error('Error fetching Markdown from GitHub:', error);
        setPost({ frontmatter: {}, content: '# Error\nFailed to load content from GitHub.' });
      }
    };

    if (slug) {
      fetchPostFromGitHub();
    }
  }, [slug]);

  const memoizedPost = useMemo(() => post, [post]);
  const title = String(memoizedPost.frontmatter.title).replace('_', ' ');

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={memoizedPost.frontmatter.description || ''} />
      </Helmet>
      <div className="mx-auto px-16 py-8">
        <SharePage url={window.location.href} title={title} />
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <MarkdownContent id="MarkdownContent" content={memoizedPost.content} />
        <div className="flex flex-row items-center justify-center m-8 space-x-2">
          <div className="flex items-center space-x-2">
            <SocialShare />
          </div>
        </div>
        <div className="mt-8">
          <Pagination />
        </div>
        <ScrollButtons />
      </div>
    </>
  );
};

export default React.memo(PageIndexGithub);