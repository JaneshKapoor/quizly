// components/ScoreCard.tsx
interface ScoreCardProps {
    score: number;
    total: number;
    onRetry: () => void;
    onBack: () => void;
  }
  
  export default function ScoreCard({
    score,
    total,
    onRetry,
    onBack,
  }: ScoreCardProps) {
    const percentage = (score / total) * 100;
  
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">Quiz Complete!</h2>
        
        <div className="text-6xl font-bold text-indigo-600 mb-6">
          {score}/{total}
        </div>
        
        <p className="text-gray-600 mb-8">
          You scored {percentage}% on this quiz!
        </p>
        
        <div className="space-x-4">
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg
                     hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
          
          <button
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-lg
                     hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }