import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MongoDB URI is required");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB successfully!");
  } catch (error) {
    console.log(error);
  }
};

export { connectToDB };
