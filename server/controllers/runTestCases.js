import Problem from "../models/problem.js";
import {
  executeCode,
  generateFile,
  generateInputFile,
} from "../utils/index.js";

const runTestCases = async (req, res) => {
  const { problemId, lang = "cpp", code } = req.body;

  try {
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const filePath = generateFile(lang, code);

    let results = [];
    let allPassed = true;

    for (let i = 0; i < problem.testcases.length; i++) {
      const tc = problem.testcases[i];
      const inputStr = tc.input.replace(/\\n/g, "\n");
      const expectedOutput = tc.output.trim();

      const inputFilePath = generateInputFile(inputStr);

      try {
        const output = await executeCode(filePath, inputFilePath);
        const normalize = (str) => str.trim().replace(/\s+/g, " ");
        const passed = normalize(output) === normalize(expectedOutput);

        if (!passed) {
          allPassed = false;
          res.json({
            success: true,
            allPassed,
            failedResult: {
              testcase: i + 1,
              passed,
              expected: expectedOutput,
              got: output.trim(),
            },
          });
        }

        results.push({
          testcase: i + 1,
          passed,
          expected: expectedOutput,
          got: output.trim(),
        });
      } catch (err) {
        allPassed = false;
        results.push({
          testcase: i + 1,
          passed: false,
          error: err.stderr || err,
        });
      }
    }

    res.json({
      success: true,
      allPassed,
      results,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { runTestCases };
