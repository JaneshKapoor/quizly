// app/page.tsx
'use client';

import { useState } from 'react';
import QuizCard from './components/QuizCard';
import QuizContainer from './components/QuizContainer';
import GKSetupCard from './components/GKSetupCard';

export default function Home() {
  const [selectedQuiz, setSelectedQuiz] = useState<'gk' | 'pdf' | null>(null);
  const [showGKSetup, setShowGKSetup] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-12">
          Quizly
        </h1>

        {!selectedQuiz ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <QuizCard
              title="General Knowledge"
              description="Test your knowledge with 10 random questions"
              onClick={() => setShowGKSetup(true)}
            />
            <QuizCard
              title="PDF Quiz"
              description="Upload a PDF and generate custom questions"
              onClick={() => setSelectedQuiz('pdf')}
            />
          </div>
        ) : (
          <QuizContainer
            type={selectedQuiz}
            onBack={() => setSelectedQuiz(null)}
          />
        )}

        {showGKSetup && (
          <GKSetupCard
            onClose={() => setShowGKSetup(false)}
            onStart={(opts) => {
              // Will use opts to start the quiz in the future
              console.log(opts);
              setShowGKSetup(false);
            }}
          />
        )}
      </div>
    </main>
  );
}