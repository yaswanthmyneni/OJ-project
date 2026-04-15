import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: {
    type: [[Number]],
    required: true,
  },
  output: {
    type: [[Number]],
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
    input: {
      type: [[Number]],
      required: true,
    },
    output: {
      type: [[Number]],
      required: true,
    },
    testcase: testCaseSchema,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Problem", problemSchema);
