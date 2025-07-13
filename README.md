# LazyApply-Job-on-Linkedin

This project automates the process of applying to jobs on LinkedIn by automatically answering application questions using Playwright and a set of customizable answer databases.

## Features

- **Automated Job Application:** Uses Playwright to fill out LinkedIn job application forms.
- **Smart Question Handling:** Supports numeric, binary (yes/no), and dropdown questions.
- **Answer Databases:** Remembers your answers in JSON files for future applications.
- **Similarity Matching:** Uses NLP to match new questions to previously answered ones.
- **Manual Fallback:** Prompts the user for answers if a new or unrecognized question is encountered.

## File Structure

- `send_application.js` - Main script to automate the application process.
- `utils_Numeric.js` - Handles numeric questions and answer similarity using NLP.
- `utils_Binary.js` - Handles yes/no (binary) questions.
- `utils_DropDown.js` - Handles dropdown selection questions.
- `numeric_response.json`, `binary_response.json`, `dropdown_response.json` - Databases for storing your answers.
- `Cashier Resume.pdf` - Example resume for uploads.

## Usage

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the automation script:**
   ```bash
   node send_application.js
   ```

3. **Answer new questions:**  
   If a question is not recognized, you will be prompted in the terminal or browser to provide an answer, which will be saved for future use.

## Requirements

- Node.js
- Playwright
- Natural (NLP library for similarity matching)

## Customization

- Edit the JSON files to pre-fill answers for common questions.
- Update the code to handle additional question types as needed.

## Disclaimer

This project is for educational purposes. Use responsibly and in accordance with LinkedIn's terms of service.