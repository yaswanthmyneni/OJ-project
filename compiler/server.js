import express from "express";
import { runTestCases } from "./controllers/runTestCases.js";
import { compileCode } from "./controllers/compileCode.js";
import "dotenv/config";

const app = express();

app.use(express.json());

app.post("/run", compileCode);
app.post("/submit", runTestCases);

app.listen(6000, () => {
  console.log("Compile service running on port 6000");
});
