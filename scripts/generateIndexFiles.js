const fs = require('fs').promises;
const path = require('path');

const markdownDir = path.join(__dirname, '..', 'public', 'markdown');

async function addFrontmatterToFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  
  if (content.startsWith('---')) {
    return;
  }

  const fileName = path.basename(filePath, '.md');
  const title = fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const date = new Date().toISOString().split('T')[0];

  const frontmatter = `---
title: ${title}
description: ''
date: ${date}
---

`;

  await fs.writeFile(filePath, frontmatter + content);
  console.log(`Added frontmatter to ${filePath}`);
}

async function generateIndexFile(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const indexData = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // إضافة المجلد كرابط داخلي
        indexData.push({
          name: entry.name,
          path: `/markdown/${path.relative(markdownDir, fullPath)}`,
          type: 'directory'
        });
        // معالجة الملفات داخل المجلد الفرعي
        await processDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        await addFrontmatterToFile(fullPath);
        indexData.push({
          name: entry.name.replace('.md','').replace('_',' '),
          path: `/markdown/${path.relative(markdownDir, fullPath).replace('.md','').replace('\\','/')}`,
          type: 'file'
        });
      }
    }

    await fs.writeFile(path.join(dir, 'index.json'), JSON.stringify(indexData, null, 2));
    console.log(`Generated index.json for ${dir}`);
  } catch (error) {
    console.error(`Error processing ${dir}:`, error);
  }
}

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && entry.name.endsWith('.md')) {
      await addFrontmatterToFile(fullPath);
    } else if (entry.isDirectory()) {
      await processDirectory(fullPath);
    }
  }
}

async function generateAllIndexFiles() {
  const mainDirs = await fs.readdir(markdownDir, { withFileTypes: true });
  
  for (const dir of mainDirs) {
    if (dir.isDirectory()) {
      const fullPath = path.join(markdownDir, dir.name);
      await generateIndexFile(fullPath);
    }
  }
}

generateAllIndexFiles().catch(console.error);




async function generateStructure(dir, basePath = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const structure = [];

  for (const entry of entries) {
    // const entryName= entry.name.replace('.md','').replace('_',' ');
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      const children = await generateStructure(fullPath, relativePath);
      structure.push({
        name: entry.name,
        type: 'directory',
        children
      });
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      await addFrontmatterToFile(fullPath);
      structure.push({
        name: entry.name.replace('.md','').replace('_',' '),
        type: 'file',
        path: relativePath.replace('.md','').replace('\\','/')
      });
    }
  }

  return structure;
}

async function generateAllFiles() {
  const structure = await generateStructure(markdownDir);
  await fs.writeFile(
    path.join(markdownDir, 'structure.json'),
    JSON.stringify(structure, null, 2)
  );
  console.log('Generated structure.json');
}

generateAllFiles().catch(console.error);