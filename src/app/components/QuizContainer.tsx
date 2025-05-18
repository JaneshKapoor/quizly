// src/app/components/QuizContainer.tsx
'use client';

interface QuizContainerProps {
  type: 'gk' | 'pdf';
  onBack: () => void;
}

export default function QuizContainer({ type, onBack }: QuizContainerProps) {
  return (
    <div>
      <button onClick={onBack} className="mb-6 text-indigo-600 hover:text-indigo-800">
        ← Back
      </button>
      <div className="text-center">
        <p className="text-gray-600">Quiz type: {type}</p>
      </div>
    </div>
  );
}