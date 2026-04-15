import express from "express";
import { connectToDB } from "./database/db.js";
import userRouter from "./routes/user.js";
import problemRouter from "./routes/problem.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import multer from "multer";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8001;

// const upload = multer({
//   dest: "uploads/",
// });
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

// Routes
app.use("/user", userRouter);
app.use("/problem", problemRouter);

connectToDB();
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
