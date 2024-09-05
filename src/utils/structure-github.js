(async () => {
      
    const axios = require('axios');
    const fs = require('fs').promises;
    const path = require('path');

    const owner = 'AhmedAlmaghz'; // اسم المالك
    const repo = 'transformers'; // اسم المستودع
    const branch = 'Add_docs_source_ar__toctree.yml'; // اسم الفرع
    const directory = 'docs/source/ar'; // اسم المجلد
    const failpath = directory+'/_toctree.yml'; // اسم المجلد

    async function getRepoContents(owner, repo, branch, dir = directory) {
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${dir}?ref=${branch}`;
      const response = await axios.get(url);
      return response.data;
    }

    async function generateStructure(owner, repo, branch, dir = directory) {
      const contents = await getRepoContents(owner, repo, branch, dir);
      const structure = [];

      for (const entry of contents) {
        if (entry.type === 'dir') {
          const children = await generateStructure(owner, repo, branch, entry.path);
          structure.push({
            name: entry.name,
            type: 'directory',
            children
          });
        } else if (entry.type === 'file' && entry.name.endsWith('.md')) {
          structure.push({
            name: entry.name.replace('.md', '').replace('_', ' '),
            type: 'file',
            path: entry.path.replace('.md', '').replace('\\', '/')
          });
        }
      }

      return structure;
    }

    async function generateAllFiles() {
      const structure = await generateStructure(owner, repo, branch);
      await fs.writeFile(
        path.join(__dirname, 'structure.json'),
        JSON.stringify(structure, null, 2)
      );
      console.log('Generated structure.json');
    }

    generateAllFiles();
})();