import { Router } from "express";
import {
  createProblem,
  getProblems,
  getProductById,
} from "../controllers/problem.js";

const problemRouter = new Router();

/**
 * @method POST
 * @path /problem/create
 */
problemRouter.post("/create", createProblem);

/**
 * @method GET
 * @path /problem/
 */
problemRouter.get("/", getProblems);

/**
 * @method GET
 * @path /problem/:id
 */
problemRouter.get("/:id", getProductById);

export { problemRouter };
