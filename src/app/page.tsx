'use client';

import { useState } from 'react';
import QuizCard from './components/QuizCard';
import QuizContainer from './components/QuizContainer';
import GKSetupCard from './components/GKSetupCard';

export default function Home() {
  const [selectedQuiz, setSelectedQuiz] = useState<'gk' | 'pdf' | null>(null);
  const [showGKSetup, setShowGKSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);

  // Define the Question type for type safety
  type Question = {
    question: string;
    options: string[];
    correctAnswer: string;
  };

  const startGKQuiz = async (opts: {
    difficulty: string;
    selectedCategories: string[];
    numQuestions: number;
  }) => {
    setShowGKSetup(false);
    setLoading(true);
    setScore(0);
    setQuestions([]);
    try {
      const res = await fetch('/api/gemini-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opts),
      });
      const data = await res.json();
      console.log('API response:', data);
      if (!data.questions || !Array.isArray(data.questions)) {
        alert('Failed to load questions. Check console for details.');
        return;
      }
      setQuestions(data.questions);
      setSelectedQuiz('gk');
    } catch (err) {
      console.error('Frontend fetch error:', err);
      alert('Failed to load questions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-indigo-900 mb-12">
            Quizly
          </h1>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-6"></div>
              <p className="text-lg text-indigo-700 font-semibold">Preparing your quiz...</p>
            </div>
          )}

          {!selectedQuiz && !loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <QuizCard
                title="General Knowledge"
                description="Test your knowledge with random questions"
                onClick={() => setShowGKSetup(true)}
              />
              <QuizCard
                title="PDF Quiz"
                description="Upload a PDF and generate custom questions"
                onClick={() => setSelectedQuiz('pdf')}
              />
            </div>
          )}

          {showGKSetup && (
            <GKSetupCard
              onClose={() => setShowGKSetup(false)}
              onStart={startGKQuiz}
            />
          )}

          {selectedQuiz === 'gk' && questions.length > 0 && (
            <QuizContainer
              type="gk"
              onBack={() => setSelectedQuiz(null)}
              questions={questions}
              score={score}
              setScore={setScore}
            />
          )}
        </div>
      </main>

      <footer className="text-center text-gray-600 mt-8 pb-4">
        Made with ❤️ by Janesh Kapoor (@<a href="https://www.linkedin.com/in/janeshkapoor/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">janeshkapoor</a>)
      </footer>
    </>
  );
}
