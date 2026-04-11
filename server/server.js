import express from "express";
import { connectToDB } from "./database/db.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8001;

// Parse JSON bodies (for API requests)
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

connectToDB();
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
