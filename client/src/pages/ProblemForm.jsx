import { useState } from "react";
import axios from "axios";

const ProblemForm = () => {
  const [form, setForm] = useState({
    author: "",
    title: "",
    statement: "",
    input: "",
    output: "",
    testcaseInput: "",
    testcaseOutput: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const parseArray = (value) => {
    try {
      return JSON.parse(value);
    } catch {
      alert("Invalid JSON format");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      author: form.author,
      title: form.title,
      statement: form.statement,
      input: parseArray(form.input),
      output: parseArray(form.output),
      testcase: {
        input: parseArray(form.testcaseInput),
        output: parseArray(form.testcaseOutput),
      },
    };

    if (
      !payload.input ||
      !payload.output ||
      !payload.testcase.input ||
      !payload.testcase.output
    )
      return;

    try {
      const res = await axios.post(
        "http://localhost:8001/problem/create",
        payload,
        {
          withCredentials: true,
        },
      );
      alert("Problem created!");
      setForm({
        author: "",
        title: "",
        statement: "",
        input: "",
        output: "",
        testcaseInput: "",
        testcaseOutput: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error creating problem");
    }
  };

  return (
    // <div style={{ padding: "20px" }}>
    //   <h2>Create Problem</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       name="author"
    //       placeholder="Author"
    //       onChange={handleChange}
    //       value={form.author}
    //     />
    //     <br />
    //     <br />
    //     <input
    //       name="title"
    //       placeholder="Title"
    //       onChange={handleChange}
    //       value={form.title}
    //     />
    //     <br />
    //     <br />
    //     <textarea
    //       name="statement"
    //       placeholder="Statement"
    //       onChange={handleChange}
    //       value={form.statement}
    //     />
    //     <br />
    //     <br />

    //     <textarea
    //       name="input"
    //       placeholder="Input (e.g. [[1,2],[3,4]])"
    //       onChange={handleChange}
    //       value={form.input}
    //     />
    //     <br />
    //     <br />

    //     <textarea
    //       name="output"
    //       placeholder="Output (e.g. [[3],[7]])"
    //       onChange={handleChange}
    //       value={form.output}
    //     />
    //     <br />
    //     <br />

    //     <textarea
    //       name="testcaseInput"
    //       placeholder="Testcase Input (e.g. [[5,6],[7,8]])"
    //       onChange={handleChange}
    //       value={form.testcaseInput}
    //     />
    //     <br />
    //     <br />

    //     <textarea
    //       name="testcaseOutput"
    //       placeholder="Testcase Output (e.g. [[11],[15]])"
    //       onChange={handleChange}
    //       value={form.testcaseOutput}
    //     />
    //     <br />
    //     <br />

    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Problem
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <input
            name="author"
            placeholder="Author"
            onChange={handleChange}
            value={form.author}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={form.title}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="statement"
            placeholder="Statement"
            onChange={handleChange}
            value={form.statement}
            className="w-full border p-2 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="input"
            placeholder="Input (e.g. [[1,2],[3,4]])"
            onChange={handleChange}
            value={form.input}
            className="w-full border p-2 rounded-lg h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="output"
            placeholder="Output (e.g. [[3],[7]])"
            onChange={handleChange}
            value={form.output}
            className="w-full border p-2 rounded-lg h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="testcaseInput"
            placeholder="Testcase Input"
            onChange={handleChange}
            value={form.testcaseInput}
            className="w-full border p-2 rounded-lg h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="testcaseOutput"
            placeholder="Testcase Output"
            onChange={handleChange}
            value={form.testcaseOutput}
            className="w-full border p-2 rounded-lg h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-[10rem] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer mt-2"
          >
            Submit Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export { ProblemForm };
