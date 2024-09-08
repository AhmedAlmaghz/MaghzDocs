import React, { Suspense, lazy } from 'react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { PuffLoader } from 'react-spinners';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ReactMarkdown = lazy(() => import('react-markdown'));

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MarkdownContent = ({ content }) => {
  return (
    <Suspense fallback={<Loader />}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          img: ({ node, ...props }) => (
            <figure className="my-8">
              <img className="max-w-full h-auto rounded-lg shadow-md mx-auto" {...props} alt={props.alt || ''} />
              {props.alt && <figcaption className="text-center text-sm mt-2 text-gray-600 italic">{props.alt}</figcaption>}
            </figure>
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-8">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                {props.children}
              </table>
            </div>
          ),
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="relative my-6">
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg text-sm"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
                <button
                  className="absolute top-2 right-2 text-xs bg-gray-700 text-white rounded-md px-2 py-1 opacity-70 hover:opacity-100 transition-opacity duration-200"
                  onClick={() => navigator.clipboard.writeText(children)}
                >
                  Copy
                </button>
              </div>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-300 text-red-900 rounded px-1 py-0.5" {...props}>
                {children}
              </code>
            );
          },
          a: ({ node, ...props }) => (
            <a
              className="text-blue-800 hover:underline"
              {...props}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.children}
            </a>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic bg-gray-100 my-4">
              {props.children}
            </blockquote>
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 my-4 space-y-2">
              {props.children}
            </ul>
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 my-4 space-y-2">
              {props.children}
            </ol>
          ),
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4  border-b-2 border-gray-200 pb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-semibold mt-6 mb-3 " {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-medium mt-5 mb-2 " {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className=" leading-relaxed my-4" {...props} />
          ),
          iframe: ({ node, ...props }) => (
            <div className="my-8">
              <iframe
                className="w-full h-64 rounded-lg shadow-md"
                {...props}
                title="Embedded Content"
                allowFullScreen
              />
            </div>
          ),
          chart: ({ node, ...props }) => (
            <div className="my-8">
              <Bar
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'Dataset 1',
                      backgroundColor: 'rgba(75,192,192,0.6)',
                      borderColor: 'rgba(75,192,192,1)',
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(75,192,192,0.8)',
                      hoverBorderColor: 'rgba(75,192,192,1)',
                      data: [65, 59, 80, 81, 56, 55, 40],
                    }
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Chart.js Bar Chart'
                    }
                  }
                }}
              />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Suspense>
  );
};

const Loader = () => (
  <div className="flex justify-center items-center h-64">
    <PuffLoader color="#3498db" size={60} />
  </div>
);

export default React.memo(MarkdownContent);