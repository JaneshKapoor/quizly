// components/QuizCard.tsx
interface QuizCardProps {
    title: string;
    description: string;
    onClick: () => void;
  }
  
  export default function QuizCard({ title, description, onClick }: QuizCardProps) {
    return (
      <button
        onClick={onClick}
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow
                   border border-gray-100 hover:border-indigo-200 text-left"
      >
        <h2 className="text-2xl font-semibold text-indigo-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </button>
    );
  }