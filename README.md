<div align="center">

# ⚡ LazyApply — AI-Powered LinkedIn Job Automation

**Automatically fill and submit LinkedIn job applications using NLP and browser automation**

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev)
[![NLP](https://img.shields.io/badge/NLP-Natural_Library-purple?style=for-the-badge)](https://github.com/NaturalNode/natural)

> 🔬 This project is the practical implementation of the published research paper:
> **"Streamlining the Recruitment Process: The Future of Automatic Job Application"**

</div>

---

## The Problem

Applying to jobs on LinkedIn is repetitive. The same questions — years of experience, willingness to relocate, expected salary, notice period — appear across hundreds of applications. Answering them manually wastes hours.

LazyApply automates this. It uses Playwright to control the browser and NLP to intelligently match new questions to answers you've already given.

---

## How It Works

```
┌─────────────────────────────────────────────────────┐
│                   LazyApply Flow                     │
└─────────────────────────────────────────────────────┘

1. Playwright opens LinkedIn and navigates to job listing
         │
         ▼
2. Detects application form fields
         │
    ┌────┴───────────────────────────────┐
    │  Question type detection           │
    ├────────────┬────────────┬──────────┤
    │  Numeric   │   Binary   │ Dropdown │
    └────┬───────┴──────┬─────┴────┬─────┘
         │              │          │
         ▼              ▼          ▼
3. NLP similarity match against JSON answer database
         │
    ┌────┴──────────────────────────────┐
    │  Match found?                     │
    ├──────────────┬────────────────────┤
    │     YES      │        NO          │
    │  Auto-fill   │  Prompt user       │
    │              │  Save to database  │
    └──────────────┴────────────────────┘
         │
         ▼
4. Submit application
```

---

## Features

- **Playwright automation** — controls Chrome/Firefox to navigate LinkedIn's application UI end-to-end
- **Smart question matching** — uses NLP (TF-IDF similarity via the `natural` library) to match new questions to your stored answers
- **3 question types handled:**
  - `utils_Numeric.js` — experience years, salary expectations, numeric inputs
  - `utils_Binary.js` — yes/no, radio button questions
  - `utils_DropDown.js` — select dropdowns
- **Persistent answer learning** — JSON databases grow with every new question, reducing manual input over time
- **Manual fallback** — prompts you in the terminal for genuinely new questions, then saves the answer for future use

---

## Quickstart

### Prerequisites
- Node.js v14+
- Playwright (installs browsers automatically)

### Setup

```bash
# 1. Clone
git clone https://github.com/sahilmulgund/LazyApply-Job-on-Linkedin.git
cd LazyApply-Job-on-Linkedin

# 2. Install dependencies (includes Playwright + NLP)
npm install

# 3. Add your resume
# Replace Cashier Resume.pdf with your own resume PDF

# 4. Pre-fill common answers (optional but recommended)
# Edit numeric_response.json, binary_response.json, dropdown_response.json
# with your standard answers to common questions

# 5. Run
node send_application.js
```

---

## Answer Database Format

**numeric_response.json** (years of experience, salary, etc.)
```json
{
  "years of experience": 2,
  "expected salary": 800000,
  "notice period in days": 30
}
```

**binary_response.json** (yes/no questions)
```json
{
  "are you willing to relocate": true,
  "do you have a valid work permit": true,
  "are you comfortable working remotely": true
}
```

**dropdown_response.json** (select options)
```json
{
  "highest level of education": "Bachelor's",
  "employment type preference": "Full-time"
}
```

---

## File Structure

```
LazyApply-Job-on-Linkedin/
├── send_application.js       # Main entry point — runs the automation
├── utils_Numeric.js          # Numeric question handler + NLP matching
├── utils_Binary.js           # Binary (yes/no) question handler
├── utils_DropDown.js         # Dropdown question handler
├── numeric_response.json     # Stored numeric answers
├── binary_response.json      # Stored binary answers
├── dropdown_response.json    # Stored dropdown answers
└── package.json
```

---

## Research Connection

This project directly implements the system proposed in the paper:

> **"Streamlining the Recruitment Process: The Future of Automatic Job Application"** — Saheel Mulgund

The paper explores how NLP and browser automation can reduce the manual effort in job applications, improve application consistency, and scale the job search process. LazyApply is the working prototype.

---

## ⚠️ Disclaimer

This project is for educational and research purposes. Use responsibly and in compliance with [LinkedIn's Terms of Service](https://www.linkedin.com/legal/user-agreement). The author is not responsible for account restrictions resulting from misuse.

---

<div align="center">

Built by [Saheel Mulgund](https://github.com/sahilmulgund) · [LinkedIn](https://www.linkedin.com/in/saheelmulgund)
[Research Publication](#) · [GitHub Profile](https://github.com/sahilmulgund)

</div>
