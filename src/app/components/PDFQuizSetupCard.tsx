import { useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type PDFQuizOptions = {
  pdfText: string;
  difficulty: string;
  numQuestions: number;
};

type PDFTextItem = { str: string };

export default function PDFQuizSetupCard({
  onClose,
  onStart,
}: {
  onClose: () => void;
  onStart: (opts: PDFQuizOptions) => void;
}) {
  const [difficulty, setDifficulty] = useState('easy');
  const [numQuestions, setNumQuestions] = useState(5);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PDF.js dynamic import for SSR compatibility
  const extractTextFromPDF = async (file: File) => {
    setLoading(true);
    // @ts-expect-error: No type definitions for pdfjs-dist/legacy/build/pdf
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

    const reader = new FileReader();
    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result as ArrayBuffer);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += (content.items as PDFTextItem[]).map(item => item.str).join(' ') + '\n';
      }
      setPdfText(text);
      setLoading(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfName(file.name);
      extractTextFromPDF(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfName(file.name);
      extractTextFromPDF(file);
    }
  };

  const isReady = !!pdfText && !!difficulty && !!numQuestions;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl flex w-full max-w-3xl transition-all duration-300">
        {/* Left Side */}
        <div className="flex-1 p-8 flex flex-col justify-center items-center border-r border-gray-100">
          <div
            className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="text-4xl mb-2">📄</span>
            <span className="font-semibold text-indigo-900 mb-1">
              {pdfName ? pdfName : 'Drop or upload a PDF'}
            </span>
            <span className="text-gray-500 text-sm">
              Click or drag a PDF file here
            </span>
            {loading && <span className="mt-2 text-indigo-600">Extracting text...</span>}
            {pdfText && !loading && (
              <span className="mt-2 text-green-600">PDF loaded!</span>
            )}
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="mb-4">
            <div className="font-semibold mb-2 text-indigo-800">
              Choose your difficulty level: <span className="text-red-500">*</span>
            </div>
            <div className="flex gap-2">
              {['easy', 'medium', 'hard'].map(level => (
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
            <div className="font-semibold mb-2 text-indigo-800">
              How many questions? <span className="text-red-500">*</span>
            </div>
            <div className="flex gap-2">
              {[5, 10, 20].map(n => (
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
            className={`mt-4 w-full py-3 rounded-lg font-semibold transition cursor-pointer ${
              isReady
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={() =>
              isReady &&
              onStart({
                pdfText: pdfText!,
                difficulty,
                numQuestions,
              })
            }
            disabled={!isReady}
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