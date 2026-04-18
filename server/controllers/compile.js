import { executeCode, generateFile } from "../utils/index.js";

const compileCode =  async (req, res) => {
    const { lang = 'cpp', code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const filePath = generateFile(lang, code);
        const output = await executeCode(filePath);
        res.json({ filePath, output });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export { compileCode };
