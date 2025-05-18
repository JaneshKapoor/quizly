import type { NextApiRequest, NextApiResponse } from 'next';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { difficulty, selectedCategories, numQuestions } = req.body;

  const prompt = `
Generate ${numQuestions} general knowledge multiple-choice questions.
Difficulty: ${difficulty}
Categories: ${selectedCategories.join(', ')}

Format as a JSON array:
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctAnswer": "string"
  }
]
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    console.log('Gemini API raw response:', JSON.stringify(data, null, 2));

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('Gemini extracted text:', text);

    try {
      // Remove code fences if present
      const cleaned = text.replace(/```json|```/g, '').trim();
      const questions = JSON.parse(cleaned);
      res.status(200).json({ questions });
    } catch (err) {
      console.error('JSON parse error:', err);
      res.status(500).json({ error: 'Failed to parse questions from Gemini.', raw: text });
    }
  } catch (err) {
    console.error('Gemini API fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch from Gemini.' });
  }
}