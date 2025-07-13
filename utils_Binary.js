const fs = require('fs');

//-------------------------------------------------2. Binary response HANDLER-------------------------
const binaryAnswersFilePath = './binary_response.json';
let binaryAnswersDatabase = {};

// Check if the binary_response.json file exists and read its content
if (fs.existsSync(binaryAnswersFilePath)) {
  const data = fs.readFileSync(binaryAnswersFilePath, 'utf8');
  binaryAnswersDatabase = JSON.parse(data);
} else {
  console.log('binary_response.json file not found. Creating a new one.');
  fs.writeFileSync(binaryAnswersFilePath, JSON.stringify(binaryAnswersDatabase, null, 2));
}

async function answerBinaryQuestions(page) {
  // Define selectors for binary questions
  const binaryQuestionSelectors = ['fieldset[data-test-form-builder-radio-button-form-component="true"]'];

  for (let selector of binaryQuestionSelectors) {
    const questionElements = await page.$$(selector);
    for (let questionElement of questionElements) {
      const questionTextElement = await questionElement.$('span[data-test-form-builder-radio-button-form-component__title]');

      if (questionTextElement) {
        const questionText = (await questionTextElement.textContent()).trim();
        console.log("Binary Question:", questionText);

        let answer = binaryAnswersDatabase[questionText];

        if (!answer) {
          answer = await handleNewQuestionBinary(questionText, page);
          binaryAnswersDatabase[questionText] = answer;
          fs.writeFileSync(binaryAnswersFilePath, JSON.stringify(binaryAnswersDatabase, null, 2));
        }

        const yesInput = await questionElement.$('input[value="Yes"]');
        const noInput = await questionElement.$('input[value="No"]');

        try {
          if (answer === 'Yes' && yesInput) {
            await yesInput.scrollIntoViewIfNeeded();
            await yesInput.click({ force: true });
          } else if (answer === 'No' && noInput) {
            await noInput.scrollIntoViewIfNeeded();
            await noInput.click({ force: true });
          } else {
            console.log(`No suitable answer found for: "${questionText}". Skipping.`);
          }
        } catch (error) {
          console.error(`Failed to click on the answer for: "${questionText}". Error: ${error}`);
        }
      } else {
        console.log("Question text element not found for selector:", selector);
      }
    }
  }
}

async function handleNewQuestionBinary(questionText, page) {
  let answer = '';

  while (answer !== 'Yes' && answer !== 'No') {
    answer = await new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(`Please provide an answer for the question "${questionText}" (Yes/No): `, (input) => {
        rl.close();
        resolve(input.trim());
      });
    });

    const yesInput = await page.$('input[value="Yes"]:checked');
    const noInput = await page.$('input[value="No"]:checked');

    if (yesInput) {
      return 'Yes';
    } else if (noInput) {
      return 'No';
    } else {
      console.log('No selection made via UI. Please provide "Yes" or "No" via terminal.');
    }
  }

  return answer.charAt(0).toUpperCase() + answer.slice(1);
}

module.exports = {
  answerBinaryQuestions,
  handleNewQuestionBinary,
};
