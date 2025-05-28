const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

function executeGitCommand(command) {
    try {
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        console.error(`Error ejecutando comando git: ${command}`);
        console.error(error.message);
        return false;
    }
}

async function gitOperations(fileName) {
    console.log('\nRealizando operaciones de Git...');
    
    // Git pull
    console.log('\nHaciendo pull de los cambios...');
    if (!executeGitCommand('git pull')) {
        console.log('Error al hacer pull. Continuando con el commit...');
    }
    
    // Git add
    console.log('\nAgregando archivo al staging...');
    if (!executeGitCommand(`git add posts/${fileName}`)) {
        console.log('Error al agregar el archivo al staging.');
        return false;
    }
    
    // Git commit
    console.log('\nCreando commit...');
    if (!executeGitCommand(`git commit -m "feat: nuevo post ${fileName}"`)) {
        console.log('Error al crear el commit.');
        return false;
    }
    
    // Git push
    console.log('\nHaciendo push de los cambios...');
    if (!executeGitCommand('git push')) {
        console.log('Error al hacer push.');
        return false;
    }
    
    return true;
}

function getUniqueFileName(baseFileName) {
    let counter = 1;
    let fileName = baseFileName;
    const postsDir = path.join(__dirname, '..', 'posts');
    
    while (fs.existsSync(path.join(postsDir, fileName))) {
        const nameWithoutExt = baseFileName.replace('.md', '');
        fileName = `${nameWithoutExt}${counter}.md`;
        counter++;
    }
    
    return fileName;
}

async function getContentType() {
    while (true) {
        console.log('\nSeleccione el tipo de contenido:');
        console.log('1. Texto Markdown');
        console.log('2. Quote (solo título, se mostrará en gris y no será clickeable)');
        console.log('3. Video de YouTube');
        const choice = await question('Seleccione una opción (1-3): ');
        
        if (['1', '2', '3'].includes(choice)) {
            return choice;
        }
        console.log('Opción inválida. Por favor seleccione 1, 2 o 3.');
    }
}

async function getMarkdownContent() {
    console.log('\nEscriba el contenido en Markdown (presione Enter dos veces para finalizar):');
    let content = '';
    let emptyLines = 0;
    
    while (emptyLines < 2) {
        const line = await question('');
        if (line === '') {
            emptyLines++;
        } else {
            emptyLines = 0;
        }
        content += line + '\n';
    }
    return content.trim();
}

async function getYouTubeContent() {
    const youtubeUrl = await question('URL de YouTube: ');
    const videoId = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    if (!videoId) {
        console.log('URL de YouTube inválida.');
        return '';
    }
    return `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
}

async function createPost() {
    try {
        // Solicitar título
        const title = await question('Título del post: ');
        
        // Solicitar fecha
        let date;
        while (true) {
            date = await question('Fecha (formato DD-MM-YYYY): ');
            if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
                break;
            }
            console.log('Formato de fecha inválido. Use DD-MM-YYYY');
        }
        
        // Solicitar visibilidad
        let visible;
        while (true) {
            const visibleInput = (await question('¿Post visible? (s/n): ')).toLowerCase();
            if (visibleInput === 's' || visibleInput === 'n') {
                visible = visibleInput === 's';
                break;
            }
            console.log('Por favor responda con "s" o "n"');
        }
        
        // Obtener el tipo de contenido
        const contentType = await getContentType();
        
        // Obtener el contenido según el tipo seleccionado
        let content = '';
        let isQuote = false;
        
        switch (contentType) {
            case '1':
                content = await getMarkdownContent();
                break;
            case '2':
                isQuote = true;
                content = ''; // No necesitamos contenido para quotes
                break;
            case '3':
                content = await getYouTubeContent();
                break;
        }
        
        // Crear el contenido del post
        let postContent = `---
date: "${date}"
title: "${title}"
visible: ${visible}
quote: ${isQuote}
slug: "${date.split('-').reverse().join('')}"
---\n\n${content}`;
        
        // Crear nombre del archivo base
        const baseFileName = `${date.split('-').reverse().join('')}.md`;
        
        // Obtener un nombre de archivo único
        const fileName = getUniqueFileName(baseFileName);
        const filePath = path.join(__dirname, '..', 'posts', fileName);
        
        // Guardar el archivo
        fs.writeFileSync(filePath, postContent);
        console.log(`\n¡Post creado exitosamente!\nRuta: ${filePath}`);
        
        // Realizar operaciones de Git
        const gitSuccess = await gitOperations(fileName);
        if (gitSuccess) {
            console.log('\n¡Operaciones de Git completadas con éxito!');
        } else {
            console.log('\nHubo algunos errores en las operaciones de Git. Por favor, verifica manualmente.');
        }
        
    } catch (error) {
        console.error('Error al crear el post:', error);
    } finally {
        rl.close();
    }
}

createPost(); 