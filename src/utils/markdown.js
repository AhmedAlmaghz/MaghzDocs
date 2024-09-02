const processMarkdown = async (filePath) => {
  try {
    // console.log(filePath);
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Failed to fetch markdown file');
    }
    const text = await response.text();
    
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = text.match(frontmatterRegex);
    
    let frontmatter = {};
    let content = text;

    if (match) {
      const frontmatterText = match[1];
      frontmatterText.split('\n').forEach(line => {
        const [key, ...value] = line.split(':');
        if (key && value.length) {
          frontmatter[key.trim()] = value.join(':').trim();
        }
      });
      content = text.slice(match[0].length);
    }

    return { frontmatter, content };
  } catch (error) {
    console.error('Error processing markdown:', error);
    return { frontmatter: {}, content: '# Error\nFailed to load content.' };
  }
};

export default processMarkdown;