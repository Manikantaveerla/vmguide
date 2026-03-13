const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'categorized_topics');
const outputFile = path.join(__dirname, 'topics.json');

function parseMarkdownToJSON() {
    if (!fs.existsSync(inputDir)) {
        console.error(`Error: Directory ${inputDir} does not exist.`);
        return;
    }

    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.md'));
    const allTopics = {};

    files.forEach(filename => {
        const filepath = path.join(inputDir, filename);
        let content = fs.readFileSync(filepath, 'utf-8');

        // Match topic title: # Topic Name
        let topicTitleMatch = content.match(/^#\s+(.+)$/m);
        let topicTitle = topicTitleMatch ? topicTitleMatch[1].trim() : filename.replace('.md', '');

        let questions = [];
        // Split by "## Question"
        let qBlocks = content.split(/^##\s+Question\s+\d+/m).filter(b => b.trim().length > 0);

        // The first block might just be header stuff, so skip it if it doesn't have options or answer details
        if (qBlocks.length > 0 && !qBlocks[0].includes('**Options:**') && !qBlocks[0].includes('<details>')) {
            qBlocks.shift();
        }

        qBlocks.forEach(block => {
            let questionObj = {
                questionText: "",
                options: [],
                answer: "",
                explanation: ""
            };

            // Extract question text (everything before **Options:** or <details>)
            let qTextMatch = block.split(/(?:\*\*Options:\*\*|<details>)/);
            if (qTextMatch.length > 0) {
                questionObj.questionText = qTextMatch[0].trim();
            }

            // Extract options
            if (block.includes('**Options:**')) {
                let optionsSection = block.split('**Options:**')[1].split('<details>')[0];
                let optionLines = optionsSection.split('\n').filter(l => l.trim().startsWith('-'));
                questionObj.options = optionLines.map(l => l.replace(/^-+\s*/, '').trim());
            }

            // Extract answer and explanation
            if (block.includes('<details>')) {
                let detailsSection = block.split('<details>')[1].split('</details>')[0];

                // Match **Correct [Answer]**
                let answerMatch = detailsSection.match(/\*\*Correct\s+(.*?)\*\*/);
                if (answerMatch) {
                    questionObj.answer = answerMatch[1].trim();
                }

                // Match *Explanation:* [Text]
                let expMatch = detailsSection.match(/\*Explanation:\*\s+(.*)/);
                if (expMatch) {
                    questionObj.explanation = expMatch[1].trim();
                } else if (detailsSection.includes('*Answer not explicitly provided')) {
                    questionObj.explanation = "Answer not explicitly provided in the source text.";
                }
            }

            if (questionObj.questionText) {
                // Formatting cleanup
                questionObj.questionText = questionObj.questionText.replace(/\n+/g, ' ');
                if (questionObj.options.length === 0) {
                    // Try to guess inline options from questionText if they exist (e.g. A) B) C) D))
                    let inlineOptions = questionObj.questionText.match(/[A-D1-4][\.\)]\s+[^A-D1-4]+/g);
                    if (inlineOptions && inlineOptions.length >= 2) {
                        questionObj.options = inlineOptions.map(o => o.trim());
                        // Remove options from question text
                        questionObj.questionText = questionObj.questionText.split(inlineOptions[0])[0].trim();
                    }
                }
                questions.push(questionObj);
            }
        });

        if (questions.length > 0) {
            allTopics[topicTitle] = questions;
        }
    });

    fs.writeFileSync(outputFile, JSON.stringify(allTopics, null, 2), 'utf-8');
    console.log(`Successfully parsed ${files.length} categories into ${outputFile}`);
}

parseMarkdownToJSON();
