import { Router } from "express";
import { compileRun, compileSubmit } from "../controllers/compile.js";

const compileRouter = new Router();

/**
 * @method POST
 * @path /compile/run
 */
compileRouter.post("/run", compileRun);

/**
 * @method POST
 * @path /compile/submit
 */
compileRouter.post("/submit", compileSubmit);

export { compileRouter };
