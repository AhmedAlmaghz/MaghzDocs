import localforage from 'localforage';
import path from 'path-browserify';
import { remark } from 'remark';
import html from 'remark-html';

export const processMarkdown = async (filePath) => {
  const fileContent = await localforage.getItem(filePath);
  if (fileContent) {
    const processedContent = await remark().use(html).process(fileContent);
    return processedContent.toString();
  }
  return '';
};

export const getMarkdownFiles = async (dir) => {
  const filesList = [];
  const keys = await localforage.keys();

  keys.forEach((key) => {
    if (key.startsWith(dir)) {
      const filePath = key;
      const fileName = path.basename(filePath, '.md');
      filesList.push({
        name: fileName,
        path: filePath,
      });
    }
  });

  return filesList;
};
