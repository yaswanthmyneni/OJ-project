import { Router } from "express";
import { signup, login, logout } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

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

/**
 * @method GET
 * @path /user/logout
 */
router.get("/logout", logout);

/**
 * @method GET
 * @path /user/dashboard
 */
// Protected route
router.get("/dashboard", auth, (req, res) => {
  res.json({ msg: "Welcome", user: req.user });
});

export default router;
