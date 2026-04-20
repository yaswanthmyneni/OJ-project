import {
  executeCode,
  generateFile,
  generateInputFile,
} from "../utils/index.js";

const compileCode = async (req, res) => {
  const { lang = "cpp", code, input } = req.body;
  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code!" });
  }
  try {
    const filePath = generateFile(lang, code);
    const inputFilePath = generateInputFile(input);
    const output = await executeCode(filePath, inputFilePath);
    res.json({ filePath, output });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export { compileCode };
