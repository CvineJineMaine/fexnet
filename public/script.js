const uploadForm = document.querySelector('#uploadForm');
const fileInput = document.querySelector('#fileInput');
const fileNameLabel = document.querySelector('#fileName');
const uploadResult = document.querySelector('#uploadResult');
const generateCode = document.querySelector('#generatedCode');
const copyBtn = document.querySelector('#copyBtn');

fileInput.addEventListener('change', (e) => {
    if(e.target.files.length > 0) {
        fileNameLabel.textContent = e.target.files[0].name;
    } else {
        fileNameLabel.textContent = 'Виберіть файл';
    }
});

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        if(!response.ok) {
            alert(result.error || 'Помилка при завантаженні файлу');
        }

        generateCode.textContent = result.code;
        uploadResult.classList.remove('hidden');
        uploadForm.reset();
        fileNameLabel.textContent = 'Виберіть файл';

    } catch (error) {
        console.error('Error uploading file:', error);
    }
})

copyBtn.addEventListener('click', () => {
    const code = generatedCode.textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Код скопійовано в буфер обміну');
    })
});

const downloadForm = document.querySelector('#downloadForm');
const codeInput = document.querySelector('#codeInput');
const downloadError = document.querySelector('#downloadError');

downloadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const code = codeInput.value.trim();
    downloadError.classList.add('hidden');

    if(!code) {
        alert('Будь ласка, введіть код файлу');
        return;
    }

    try{
        const response = await fetch(`/download/` + code);

        if(response.status === 404) {
            downloadError.textContent = 'Файл не знайдено';
            return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `file_${code}`;

        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
    } catch(error){
        console.error('Error downloading file:', error);
        downloadError.textContent = 'Помилка при завантаженні файлу';
        downloadError.classList.remove('hidden');
    }
})
