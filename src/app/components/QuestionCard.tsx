// components/QuestionCard.tsx
interface QuestionCardProps {
    question: {
      question: string;
      options: string[];
      correctAnswer: string;
    };
    onAnswer: (isCorrect: boolean) => void;
    currentQuestion: number;
    totalQuestions: number;
  }
  
  export default function QuestionCard({
    question,
    onAnswer,
    currentQuestion,
    totalQuestions,
  }: QuestionCardProps) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-4 text-sm text-gray-500">
          Question {currentQuestion} of {totalQuestions}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option === question.correctAnswer)}
              className="w-full p-4 text-left rounded-lg border border-gray-200
                       hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }