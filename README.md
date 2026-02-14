# 🚀 Playwright + Cucumber BDD Automation Framework

## 📌 Overview

This project is an End-to-End Test Automation Framework built using:

- Playwright
- Cucumber (BDD)
- Node.js
- JavaScript

The framework follows the Page Object Model (POM) design pattern and supports:

- Behavior-Driven Development (BDD)
- Modular architecture
- Centralized browser management
- Screenshot capture on failure & verification steps
- Step-level logging
- HTML reporting

---

## 🏗️ Project Structure

project-root
│
├── .github/ # CI/CD workflows (if configured)
├── common/ # Hooks, browser manager, shared classes
├── features/ # Cucumber feature files
├── step-definitions/ # Step implementation files
├── pages/ # Page Object Model classes
├── utils/ # Utility classes (Screenshot, Logger, etc.)
├── reports/ # Execution reports & screenshots
├── resources/ # Test data / configuration files
│
├── cucumber.js # Cucumber configuration
├── playwright.config.js # Playwright configuration
├── generate-report.js # Report generation script
├── package.json
└── README.md


---

## ⚙️ Prerequisites

Make sure you have installed:

- Node.js (v16 or above recommended)
- npm

---

## 📦 Installation

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
2️⃣ Install Dependencies
npm install
3️⃣ Install Playwright Browsers
npx playwright install
▶️ Running Tests
Run All Tests
npm run test
Run Specific Feature File
npx cucumber-js features/<feature-file>.feature