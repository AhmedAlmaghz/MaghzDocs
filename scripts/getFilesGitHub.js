(async () => {
    const { Octokit } = await import('@octokit/rest');
    const fs = require('fs').promises;
    const path = require('path');
    const jsyaml = require('js-yaml');
    const axios =require('axios');
    
    
    // const octokit = new Octokit({auth: 'YOUR_GITHUB_TOKEN', }); // ضع هنا رمز التوثيق الخاص بك من GitHub
    const octokit = new Octokit();  // بدون مصادقة لمستودعات عامة

    const owner = 'AhmedAlmaghz';  // اسم المستخدم الخاص بك في GitHub
    const repo = 'transformers';  // اسم المستودع
    const branch = 'Add_docs_source_ar__toctree.yml';  // الفرع الذي تريد قراءة الملفات منه
    const githubDir='docs/source/ar';
    const localDir = path.join(__dirname, '../public/markdown');  // الدليل المحلي الذي سيتم تنزيل الملفات إليه
    const baseDir = 'transformers';  // المجلد الذي داخل الدليل المحلي الذي سيتم تنزيل الملفات إليها مثل public/marldown/transformers
    const addFrontmatter= true;
    const mainTitleMenu = "المحولات 🤗 Transformers";
    const structureYml = true;
    const fileYml= githubDir+'/_toctree.yml';


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
description:
date: ${date}
---

`;
      
        await fs.writeFile(filePath, frontmatter + content);
        console.log(`Added frontmatter to ${filePath}`);
      }
      

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
    async function downloadRepositoryContents(dir, basePath = '') {
        const structure = [];
        // بناء العنوان الرئيسي لشجرة قائمة الموقع - العقدة أو المجلد الرئيسي لكل القائمة (إختياري)
       
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
                // اضفة Frontmatter إلى رأس ملف المارك داون
                addFrontmatter ? await addFrontmatterToFile(localPath) : '';
                // بناء هيكل قائمة للملف
                structure.push({
                    name: entry.name.replace('.md', '').replace(/_/g, ' '),
                    type: 'file',
                    path: relativePath.replace('.md', '').replace(/\\/g, '/')
                });
            }
        
        }


        return structure;
    }


    // دالة لتحويل YAML إلى JSON بالشكل المطلوب
    const convertToCustomJson = (node) =>{
        // تحقق مما إذا كان "sections" موجودة
        if (node.sections && Array.isArray(node.sections)) {
            return {
            name: node.title || 'بدون عنوان', // تأكد من وجود العنوان
            type: 'directory',
            children: node.sections.map(convertToCustomJson) // تحويل كل عنصر داخل القسم
            };
        }
        // تحقق مما إذا كان "local" موجود
        if (node.local) {
            return {
            name: node.title || 'بدون عنوان', // تأكد من وجود العنوان
            type: 'file',
            path: node.local
            };
        }
        return {}; // في حال عدم وجود أي من هذه الحقول
    };

    // دالة لتحليل YAML وتحويله إلى JSON
    const convertYamlToJson = (yamlStr) => {
        try {
            const parsedYaml = jsyaml.load(yamlStr); // تحويل YAML إلى JavaScript object
            // console.log('Parsed YAML:', parsedYaml);
            
            // تحقق مما إذا كان هناك جذر للملف
            const convertedData = Array.isArray(parsedYaml)
            ? parsedYaml.map(convertToCustomJson)
            : convertToCustomJson(parsedYaml);
            
            // console.log('Converted Data:', JSON.stringify(convertedData, null, 2)); // تتبع النتيجة المحولة
            return convertedData;
        } catch (error) {
            console.error('Error converting YAML to JSON:', error);
            
        }
    };

    // دالة لاستبدال قيمة معينة بمتغير
    function replacePathWithVariable(jsonData, variableName) {
        return jsonData.map(item => {
        if (item.children) {
            item.children = replacePathWithVariable(item.children, variableName);
        }
        if (item.path) {
            item.path = `${variableName}/${item.path}`;
        }
        return item;
        });
    }
    async function downloadYmlStructure(){

                // بناء العنوان الرئيسي لشجرة قائمة الموقع - العقدة أو المجلد الرئيسي لكل القائمة (إختياري)
        try {
            const response = await axios.get(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${fileYml}`);
            const ymlData = response.data;
            // console.log(ymlData);
            const jsonData= convertYamlToJson(ymlData);
            // console.log(JSON.stringify(jsonData, null, 2));

            const addToJsonData = `[{
                "name": "${mainTitleMenu}",
                "type": "directory",
                "children":
                    ${JSON.stringify(jsonData, null, 2)}
            }]`;
    
            const structure = JSON.parse(addToJsonData);
            
            // استبدال القيمة
            const updatedJsonData= replacePathWithVariable(structure,baseDir);
            // structure= JSON.stringify(structure, null, 2).replace('"path": "',`"path": "${baseDir}`);
            console.log(JSON.stringify(updatedJsonData, null, 2));
            return updatedJsonData;      
        }
        catch{}
        

    }

    /**
     * الوظيفة الرئيسية التي تبدأ عملية التنزيل وتبني ملف structure.json
     */
    async function downloadAllFilesAndGenerateStructure() {
        // تحقق من وجود الدليل المحلي، إذا لم يكن موجودًا، قم بإنشائه
        await fs.mkdir(localDir, { recursive: true });

        
        
        if(!structureYml){
            // ابدأ بتنزيل ملفات Markdown من الدليل المحدد في GitHub وبناء البنية
            const structure = await downloadRepositoryContents(githubDir,baseDir);
            // كتابة ملف structure.json إلى الدليل المحلي
            await fs.writeFile(
                path.join(localDir, 'structure.json'),
                JSON.stringify(structure, null, 2)
            );
            console.log('All Markdown files have been downloaded and structure.json has been generated.');
        }else {
            // ابدأ بتنزيل ملفات Markdown من الدليل المحدد في GitHub وبناء البنية
            const structureYml = await downloadYmlStructure();
            // كتابة ملف structure.json إلى الدليل المحلي
            await fs.writeFile(
                path.join(localDir, 'structure.json'),
                JSON.stringify(structureYml, null, 2)
            );
            console.log('All Markdown files have been downloaded and structure.json has been generated.');
        }
        

    }

    downloadAllFilesAndGenerateStructure().catch(console.error);
})();