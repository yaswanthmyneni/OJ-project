import { exec } from "child_process";
import fs from "fs";
import path from "path";

const outputPath = path.join(process.cwd(), "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCode = (filepath) => {
  const [jobId, lang] = path.basename(filepath).split(".");
  let outPath = "";

  if (lang === "cpp") {
    outPath = path.join(outputPath, `${jobId}.out`);
  }

  return new Promise((resolve, reject) => {
    let command = "";
    if (lang === "py") {
      command = `python3 ${filepath}`;
    } else if (lang === "js") {
      command = `node ${filepath}`;
    } else {
      command = `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

export { executeCode };
