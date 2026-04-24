import { Router } from "express";
import { compileCode } from "../controllers/compileCode.js";
import { runTestCases } from "../controllers/runTestCases.js";

const compileRouter = new Router();

/**
 * @method POST
 * @path /compile/run
 */
compileRouter.post("/run", compileCode);


/**
 * @method POST
 * @path /compile/submit
 */
compileRouter.post("/submit", runTestCases);

export { compileRouter };
