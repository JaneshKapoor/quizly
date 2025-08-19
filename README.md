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
  - Server-side text extraction from PDFs using pdf-parse library.
  - The app extracts text from your PDF and generates a custom quiz using Gemini.
  - Supports drag-and-drop and file picker with reliable processing.

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
- **PDF Processing:** pdf-parse, formidable
- **File Handling:** Server-side PDF text extraction

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

**Key packages installed:**
```bash
# Core dependencies
npm install pdf-parse formidable

# TypeScript support
npm install --save-dev @types/pdf-parse @types/formidable
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
      gemini-quiz.ts      # General Knowledge quiz generation
      pdf-quiz.ts         # PDF-based quiz generation
      extract-pdf.ts      # Server-side PDF text extraction
public/
  (static assets)
```

---

## � PDwF Processing Architecture

The PDF quiz feature uses a robust server-side approach:

1. **File Upload:** Frontend sends PDF via FormData to `/api/extract-pdf`
2. **Server Processing:** Uses `pdf-parse` library to extract text from PDF
3. **Text Validation:** Ensures readable text is found (not scanned images)
4. **Quiz Generation:** Extracted text is sent to Gemini API via `/api/pdf-quiz`
5. **Question Display:** Generated questions are displayed in the quiz interface

**Key Dependencies:**
- `pdf-parse` - Server-side PDF text extraction
- `formidable` - Handles multipart file uploads
- `@types/pdf-parse` & `@types/formidable` - TypeScript support

---

## 📝 How It Works

- **General Knowledge:**  
  Select your quiz options, and Gemini generates 5/10/20 MCQs in real time.

- **PDF Quiz:**  
  Upload a PDF, the server extracts its text using pdf-parse, and Gemini generates a quiz based on your document content.

- **Quiz Flow:**  
  - Select an answer, click Next, and see your score at the end.
  - Retry the quiz or return to the home page.

---

## � TroDubleshooting

### PDF Upload Issues
- **"No text found in PDF":** The PDF might be a scanned image. Try a PDF with selectable text.
- **Upload fails:** Check file size (default limit: ~10MB) and ensure it's a valid PDF.
- **Processing slow:** Large PDFs take longer to process. The app shows a loading indicator.

### API Issues
- **Quiz generation fails:** Verify your `GEMINI_API_KEY` is set correctly in `.env.local`.
- **Server errors:** Check the console for detailed error messages.

---

## 🧑‍💻 Developer

**Janesh Kapoor**  
Built with ❤️ using [Cursor](https://www.cursor.so/) in India

---

## 📄 License

This project is licensed under the MIT License.
