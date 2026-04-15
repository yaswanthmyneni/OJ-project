import { Router } from "express";
import { createProblem, getProblems, getProductById } from "../controllers/problem.js";

const router = new Router();

/**
 * @method POST
 * @path /problem/create
 */
router.post("/create", createProblem);


/**
 * @method GET
 * @path /problem/
 */
router.get("/", getProblems);


/**
 * @method GET
 * @path /problem/:id
 */
router.get("/:id", getProductById);

export default router;
