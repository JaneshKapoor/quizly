import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import pdf from "pdf-parse";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({});
    const [, files] = await form.parse(req);

    const file = Array.isArray(files.pdf) ? files.pdf[0] : files.pdf;

    if (!file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    // Read the PDF file
    const dataBuffer = fs.readFileSync(file.filepath);

    // Extract text using pdf-parse
    const data = await pdf(dataBuffer);

    // Clean up the temporary file
    fs.unlinkSync(file.filepath);

    if (!data.text || data.text.trim().length === 0) {
      return res.status(400).json({ error: "No text found in PDF" });
    }

    return res.status(200).json({
      text: data.text.trim(),
      pages: data.numpages,
    });
  } catch (error) {
    console.error("PDF extraction error:", error);
    return res.status(500).json({ error: "Failed to extract text from PDF" });
  }
}
