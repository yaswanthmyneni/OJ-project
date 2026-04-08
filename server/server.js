import express from "express";
import { connectToDB } from "./config/db.js";
import userRouter from "./routes/user.js";
import cookieSession from "cookie-session";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8001;

// Parse JSON bodies (for API requests)
app.use(express.json());
app.use(
  cookieSession({
    name: "session-cookie",
    secret: process.env.CS_SECRET,
    secure: process.env.NODE_ENV === "production",
  }),
);

// Routes
app.use("/user", userRouter);

connectToDB();
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
