const fs = require('fs');
const path = require('path');
const marked = require('marked');

const markdownDir = path.join(__dirname, '..', 'public', 'markdown'); // المجلد الذي يحتوي على ملفات Markdown
const outputDir = path.join(__dirname, '..', 'public', 'html');  // المجلد الذي سيتم حفظ ملفات HTML فيه

// إنشاء المجلد الناتج إذا لم يكن موجودًا
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// قراءة كل ملف Markdown وتحويله إلى HTML
fs.readdir(markdownDir, (err, files) => {
//   if (err) {
//     console.error('Unable to scan directory: ' + err);
//     return;
//   }

  files.forEach(file => {
    if (path.extname(file) === '.md') {
      const markdownFilePath = path.join(markdownDir, file);
      const htmlFilePath = path.join(outputDir, file.replace('.md', '.html'));

      fs.readFile(markdownFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file: ' + err);
          return;
        }

        const htmlContent = marked(data);

        fs.writeFile(htmlFilePath, htmlContent, err => {
          if (err) {
            console.error('Error writing file: ' + err);
          } else {
            console.log(`Converted ${file} to ${htmlFilePath}`);
          }
        });
      });
    }
  });
});