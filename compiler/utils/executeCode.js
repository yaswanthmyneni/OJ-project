import { exec } from "child_process";
import fs from "fs";
import path from "path";

const outputPath = path.join(process.cwd(), "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCode = (filepath, inputFilePath) => {
  const [jobId, lang] = path.basename(filepath).split(".");
  let outPath = "";

  if (lang === "cpp") {
    outPath = path.join(outputPath, `${jobId}.out`);
  }

  return new Promise((resolve, reject) => {
    let command = "";
    if (lang === "py") {
      command = `python3 ${filepath} < ${inputFilePath}`;
    } else if (lang === "js") {
      command = `node ${filepath} < ${inputFilePath}`;
    } else {
      command = `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputFilePath}`;
    }

    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
      if (error) {
        return reject(error.message);
      }

      if (stderr && !stdout) {
        return reject(stderr);
      }

      return resolve(stdout);
    });
  });
};

export { executeCode };
