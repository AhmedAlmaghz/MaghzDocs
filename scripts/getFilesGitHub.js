(async () => {
    const { Octokit } = await import('@octokit/rest');
    const fs = require('fs').promises;
    const path = require('path');
    
    
    // const octokit = new Octokit({auth: 'YOUR_GITHUB_TOKEN', }); // ضع هنا رمز التوثيق الخاص بك من GitHub
    const octokit = new Octokit();  // بدون مصادقة لمستودعات عامة

    const owner = 'AhmedAlmaghz';  // اسم المستخدم الخاص بك في GitHub
    const repo = 'transformers';  // اسم المستودع
    const branch = 'Add_docs_source_ar__toctree.yml';  // الفرع الذي تريد قراءة الملفات منه
    const githubDir='docs/source/ar';
    const localDir = path.join(__dirname, '../public/markdown');  // الدليل المحلي الذي سيتم تنزيل الملفات إليه

    /**
     * وظيفة لتنزيل ملف Markdown معين
     */
    async function downloadFile(filePath, localPath) {
         // تأكد من أن الدليل المحلي موجود
        await fs.mkdir(path.dirname(localPath), { recursive: true });
        const response = await octokit.repos.getContent({
            owner,
            repo,
            path: filePath,
            ref: branch,
        });

        const fileContent = Buffer.from(response.data.content, 'base64');
        await fs.writeFile(localPath, fileContent);
        console.log(`Downloaded: ${localPath}`);
    }

    /**
     * وظيفة لتنزيل محتويات دليل معين وبناء بنية الملفات
     */
    async function downloadRepositoryContents(dir, basePath = githubDir) {
        const structure = [];
        const response = await octokit.repos.getContent({
            owner,
            repo,
            path: dir,
            ref: branch,
        });

        for (const entry of response.data) {
            const relativePath = path.join(basePath, entry.name);
            const localPath = path.join(localDir, relativePath);

            if (entry.type === 'dir') {
                // إذا كان العنصر مجلدًا، قم بإنشاء المجلد محليًا واستدعاء الوظيفة بشكل متكرر
                await fs.mkdir(localPath, { recursive: true });
                const children = await downloadRepositoryContents(entry.path, relativePath);
                structure.push({
                    name: entry.name,
                    type: 'directory',
                    children
                });
            } else if (entry.type === 'file' && entry.name.endsWith('.md')) {
                // إذا كان العنصر ملف Markdown، قم بتنزيله وحفظه محليًا
                await downloadFile(entry.path, localPath);
                structure.push({
                    name: entry.name.replace('.md', '').replace(/_/g, ' '),
                    type: 'file',
                    path: relativePath.replace('.md', '').replace(/\\/g, '/')
                });
            }
        }

        return structure;
    }

    /**
     * الوظيفة الرئيسية التي تبدأ عملية التنزيل وتبني ملف structure.json
     */
    async function downloadAllFilesAndGenerateStructure() {
        // تحقق من وجود الدليل المحلي، إذا لم يكن موجودًا، قم بإنشائه
        await fs.mkdir(localDir, { recursive: true });

        // ابدأ بتنزيل ملفات Markdown من الدليل المحدد في GitHub وبناء البنية
        const structure = await downloadRepositoryContents(githubDir);

        // كتابة ملف structure.json إلى الدليل المحلي
        await fs.writeFile(
            path.join(localDir, 'structure.json'),
            JSON.stringify(structure, null, 2)
        );
        console.log('All Markdown files have been downloaded and structure.json has been generated.');
    }

    downloadAllFilesAndGenerateStructure().catch(console.error);
})();