const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfDir = path.join(__dirname, 'pdfs');
const outputFile = path.join(__dirname, 'raw_extracted_text.txt');

async function extractTextFromPDFs() {
    if (!fs.existsSync(pdfDir)) {
        console.error(`Error: Directory ${pdfDir} does not exist.`);
        process.exit(1);
    }

    const files = fs.readdirSync(pdfDir).filter(f => f.toLowerCase().endsWith('.pdf'));

    if (files.length === 0) {
        console.log(`No PDF files found in ${pdfDir}`);
        process.exit(0);
    }

    console.log(`Found ${files.length} PDF files. Starting extraction...`);
    let allText = "";

    for (const filename of files.sort()) {
        const filepath = path.join(pdfDir, filename);
        try {
            const dataBuffer = fs.readFileSync(filepath);
            const data = await pdf(dataBuffer);
            
            allText += `\n\n${'='.repeat(80)}\n--- START OF FILE: ${filename} ---\n${'='.repeat(80)}\n\n`;
            allText += data.text;
            allText += `\n\n--- END OF FILE: ${filename} ---\n\n`;
            
            console.log(`Successfully extracted text from: ${filename} (${data.numpages} pages)`);
        } catch (error) {
            console.error(`Error reading ${filename}:`, error.message);
        }
    }

    try {
        fs.writeFileSync(outputFile, allText, 'utf-8');
        console.log(`\nSuccessfully wrote all extracted text to ${outputFile}`);
    } catch (error) {
        console.error(`Error writing to output file:`, error.message);
    }
}

extractTextFromPDFs();
