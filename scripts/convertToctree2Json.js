const yaml = require('js-yaml');


// دالة لتحويل YAML إلى JSON بالشكل المطلوب
async function convertToCustomJson(node){
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
async function convertYamlToJson(yamlStr){
    try {
        const parsedYaml = yaml.load(yamlStr); // تحويل YAML إلى JavaScript object
        console.log('Parsed YAML:', parsedYaml);
        
        // تحقق مما إذا كان هناك جذر للملف
        const convertedData = Array.isArray(parsedYaml)
        ? parsedYaml.map(convertToCustomJson)
        : convertToCustomJson(parsedYaml);
        
        console.log('Converted Data:', convertedData); // تتبع النتيجة المحولة
        return convertedData;
    } catch (error) {
        console.error('Error converting YAML to JSON:', error);
        
    }
};

convertYamlToJson;
