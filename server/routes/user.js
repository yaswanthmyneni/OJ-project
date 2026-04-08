import { Router } from "express";
import { signup, login } from "../controllers/user.js";

const router = new Router();

/**
 * @method POST
 * @path /user/signup
 */
router.post("/signup", signup);

/**
 * @method POST
 * @path /user/login
 */
router.post("/login", login);

export default router;
