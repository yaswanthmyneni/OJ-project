import { Router } from "express";
import { codeAnalysis } from "../controllers/ai.js";

const aiRouter = new Router();

/**
 * @method POST
 * @path /ai/code-analysis
 */
aiRouter.post("/code-analysis", codeAnalysis);

export { aiRouter };
