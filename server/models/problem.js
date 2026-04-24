import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

const problemSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    statement: {
      type: String,
      required: true,
    },
    sampleInput: {
      type: String,
      required: true,
    },
    sampleOutput: {
      type: String,
      required: true,
    },
    testcases: [testCaseSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Problem", problemSchema);
