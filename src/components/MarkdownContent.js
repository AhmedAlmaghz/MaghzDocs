import React, { Suspense, lazy } from 'react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { PuffLoader } from 'react-spinners'; // استيراد اللودينج أنيميشن من react-spinners
import { Bar } from 'react-chartjs-2'; // استيراد الرسوم البيانية
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// استخدام React.lazy لتحميل ReactMarkdown بشكل مؤجل
const ReactMarkdown = lazy(() => import('react-markdown'));

const MarkdownContent = ({ content }) => {
  return (
    <Suspense fallback={<Loader />}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeRaw]}
        components={{
          img: ({ node, ...props }) => (
            <figure className="flex justify-center">
              <img className="max-w-full h-auto rounded-lg shadow-md" {...props} alt={props.alt || ''} />
              {props.alt && <figcaption className="text-center text-sm mt-2 text-gray-500">{props.alt}</figcaption>}
            </figure>
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                {props.children}
              </table>
            </div>
          ),
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="relative">
                <pre className={`language-${match[1]} p-2 rounded-lg bg-gray-800 text-white overflow-x-auto`}>
                  <button
                    className="absolute top-2 right-2 text-sm bg-gray-700 text-white rounded px-2 py-1"
                    onClick={() => navigator.clipboard.writeText(children)}
                  >
                    نسخ
                  </button>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code className={`bg-gray-200 rounded p-1 ${className || ''}`} {...props}>
                {children}
              </code>
            );
          },
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:underline"
              {...props}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.children}
            </a>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
              {props.children}
            </blockquote>
          ),
          tip: ({ node, ...props }) => (
            <tip className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
              {props.children}
            </tip>
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6">
              {props.children}
            </ul>
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6">
              {props.children}
            </ol>
          ),
          // دعم الفيديوهات
          iframe: ({ node, ...props }) => (
            <div className="video-container">
              <iframe
                className="w-full h-64 rounded-lg shadow-md"
                {...props}
                title="Embedded Video"
                allowFullScreen
              />
            </div>
          ),
          // دعم الرسومات التوضيحية
          svg: ({ node, ...props }) => (
            <div className="flex justify-center">
              <svg className="w-full h-auto" {...props} />
            </div>
          ),
          // دعم للرسوم البيانية باستخدام react-chartjs-2
          chart: ({ node, ...props }) => (
            <div className="my-4">
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
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
                height={400}
              />
            </div>
          ),
          // دعم للخرائط التفاعلية باستخدام Google Maps
          map: ({ node, ...props }) => (
            <div className="my-4">
              <iframe
                className="w-full h-64 rounded-lg shadow-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093647!2d144.95373531531828!3d-37.81720997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f7c9b7%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1614857600000!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ),
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mt-4 mb-2">
              {props.children}
            </h1>
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mt-4 mb-2">
              {props.children}
            </h2>
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-medium mt-4 mb-2">
              {props.children}
            </h3>
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-medium mt-4 mb-2">
              {props.children}
            </h4>
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-base font-medium mt-4 mb-2">
              {props.children}
            </h5>
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-sm font-medium mt-4 mb-2">
              {props.children}
            </h6>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Suspense>
  );
};

// مكون لودينج أنيميشن باستخدام react-spinners
const Loader = () => (
  <div className="flex justify-center items-center h-64">
    <PuffLoader color="#3498db" size={40} />
  </div>
);

export default MarkdownContent;