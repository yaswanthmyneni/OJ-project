import express from "express";
import { connectToDB } from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  problemRouter,
  userRouter,
  compileRouter,
  aiRouter,
} from "./routes/index.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8001;

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
app.use("/compile", compileRouter);
app.use("/ai", aiRouter);

connectToDB();
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
