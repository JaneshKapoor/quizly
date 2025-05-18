import { useState } from 'react';

// Define a type for the questions to avoid 'any'
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizContainerProps {
  type: 'gk' | 'pdf';
  onBack: () => void;
  questions: Question[];
  score: number;
  setScore: (score: number) => void;
}

export default function QuizContainer({
  onBack,
  questions,
  score,
  setScore,
}: QuizContainerProps) {
  const [current, setCurrent] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedOption === questions[current].correctAnswer) {
      setScore(score + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelectedOption(null); // Reset for next question
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">Quiz Complete!</h2>
        <div className="text-6xl font-bold text-indigo-600 mb-6">
          {score}/{questions.length}
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => {
              setCurrent(0);
              setShowScore(false);
              setScore(0);
              setSelectedOption(null);
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Retry Quiz
          </button>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-200 text-indigo-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold border border-gray-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto">
      <div className="mb-4 text-sm text-gray-500">
        Question {current + 1} of {questions.length}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {questions[current].question}
      </h3>
      <div className="space-y-3 mb-6">
        {questions[current].options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedOption(option)}
            className={`w-full p-4 text-left rounded-lg border transition-colors
              ${selectedOption === option
                ? 'bg-indigo-600 text-white border-indigo-700'
                : 'bg-white text-indigo-900 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={!selectedOption}
        className={`w-full py-3 rounded-lg font-semibold transition
          ${selectedOption
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        `}
      >
        {current + 1 === questions.length ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}