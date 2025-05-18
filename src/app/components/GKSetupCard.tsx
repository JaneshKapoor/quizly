// src/app/components/GKSetupCard.tsx
import { useState, MouseEvent } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type GKOptions = {
  difficulty: string;
  selectedCategories: string[];
  numQuestions: number;
};

const categories = [
  { label: "📚 History", value: "history" },
  { label: "🌍 Geography", value: "geography" },
  { label: "🔬 Science", value: "science" },
  { label: "🎭 Pop Culture", value: "pop_culture" },
  { label: "🧮 Mathematics", value: "mathematics" },
  { label: "❓ Mixed Bag", value: "mixed_bag" },
];

export default function GKSetupCard({ onClose, onStart }: { onClose: () => void, onStart: (opts: GKOptions) => void }) {
  const [difficulty, setDifficulty] = useState('easy');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState(5);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Close modal if clicking outside the card
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl flex w-full max-w-3xl transition-all duration-300">
        {/* Left Side */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-indigo-900 mb-2">General Knowledge</h2>
          <p className="text-gray-600 mb-6">Test your knowledge with custom questions!</p>
        </div>
        {/* Right Side */}
        <div className="flex-1 p-8 border-l border-gray-100 flex flex-col justify-center">
          <div className="mb-4">
            <div className="font-semibold mb-2 text-indigo-800">Choose your difficulty level:</div>
            <div className="flex gap-2">
              {['easy', 'medium', 'hard'].map((level) => (
                <button
                  key={level}
                  className={`px-4 py-2 rounded-lg border transition cursor-pointer ${
                    difficulty === level
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-indigo-700 border-indigo-200'
                  }`}
                  onClick={() => setDifficulty(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-2 text-indigo-800">Select a category (or categories):</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  className={`px-3 py-2 rounded-lg border transition cursor-pointer ${
                    selectedCategories.includes(cat.value)
                      ? 'bg-indigo-100 border-indigo-400 text-indigo-900'
                      : 'bg-white border-gray-200 text-indigo-700'
                  }`}
                  onClick={() => toggleCategory(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-2 text-indigo-800">How many questions?</div>
            <div className="flex gap-2">
              {[5, 10, 20].map((n) => (
                <button
                  key={n}
                  className={`px-4 py-2 rounded-lg border transition cursor-pointer ${
                    numQuestions === n
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-indigo-700 border-indigo-200'
                  }`}
                  onClick={() => setNumQuestions(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <button
            className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
            onClick={() => onStart({ difficulty, selectedCategories, numQuestions })}
          >
            Start Quiz
          </button>
        </div>
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-indigo-600 transition cursor-pointer"
          onClick={onClose}
        >
          <XMarkIcon className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}