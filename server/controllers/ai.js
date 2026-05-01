import Problem from "../models/problem.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.4,
    maxOutputTokens: 1000,
  },
});


/**
 * @method POST
 * @path /ai/code-analysis
 */

const codeAnalysis = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is invalid!" });
    }

    if (prompt.length > 5000) {
      return res.status(400).json({ error: "Prompt too long" });
    }

    const fullPrompt = `
You are a senior developer. Analyze this code:

${prompt}

Respond with:
- Explanation
- Bugs/issues
- Improvements
`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;

    res.json({ reply: response.text() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export { codeAnalysis };
