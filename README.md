# Quizly

Quizly is a modern, full-stack quiz web application built with Next.js (App Router), React, and the Gemini API. It allows users to take engaging quizzes in two modes: General Knowledge and PDF-based custom quizzes.
Developed by [**Janesh Kapoor**](https://www.linkedin.com/in/janeshkapoor/) using [Cursor](https://www.cursor.so/).

---

## ✨ Features

- **General Knowledge Quiz:**  
  - Choose difficulty, categories, and number of questions.
  - Questions and answers are generated in real-time using the Gemini API.
  - Instant scoring, retry, and beautiful UI.

- **PDF Quiz:**  
  - Upload any PDF, select difficulty and number of questions.
  - The app extracts text from your PDF and generates a custom quiz using Gemini.
  - Supports drag-and-drop and file picker.

- **Modern UI:**  
  - Responsive, mobile-friendly, and visually appealing.
  - Built with Tailwind CSS and Heroicons.

- **Retry & Score:**  
  - See your score at the end of each quiz.
  - Instantly retry the same quiz or return to the home page.

---

## 🚀 Demo

[Live on Vercel](https://quizly-six.vercel.app/)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Heroicons
- **Backend:** Next.js API Routes
- **AI:** Gemini API (Google Generative AI)
- **PDF Parsing:** pdfjs-dist

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/JaneshKapoor/quizly.git
cd quizly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your environment variables

Create a `.env.local` file in the root:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧩 Project Structure

```
src/
  app/
    components/
      GKSetupCard.tsx
      PDFQuizSetupCard.tsx
      QuizCard.tsx
      QuizContainer.tsx
      QuestionCard.tsx
      ScoreCard.tsx
    page.tsx
    layout.tsx
    globals.css
  pages/
    api/
      gemini-quiz.ts
public/
  (static assets)
```

---

## 📝 How It Works

- **General Knowledge:**  
  Select your quiz options, and Gemini generates 5/10/20 MCQs in real time.

- **PDF Quiz:**  
  Upload a PDF, the app extracts its text, and Gemini generates a quiz based on your document.

- **Quiz Flow:**  
  - Select an answer, click Next, and see your score at the end.
  - Retry the quiz or return to the home page.

---

## 🧑‍💻 Developer

**Janesh Kapoor**  
Built with ❤️ using [Cursor](https://www.cursor.so/)

---

## 📄 License

This project is licensed under the MIT License.
