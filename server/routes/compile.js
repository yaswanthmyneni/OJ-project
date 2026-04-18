import { Router } from "express";
import { compileCode } from "../controllers/compile.js";

const compileRouter = new Router();

/**
 * @method POST
 * @path /compile/run
 */
compileRouter.post("/run", compileCode);

export { compileRouter };
