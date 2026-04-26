import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const dirInputs = path.join(process.cwd(), "inputs")

if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = (input) => {
  const jobId = uuid();
  const filename = `${jobId}.txt`;
  const filepath = path.join(dirInputs, filename);
  fs.writeFileSync(filepath, input);
  return filepath;
};

export { generateInputFile };
