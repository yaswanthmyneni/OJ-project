import React, { useState } from "react";
import axios from "axios";

const CreateProblem = () => {
  const [form, setForm] = useState({
    author: "",
    title: "",
    statement: "",
    sampleInput: "",
    sampleOutput: "",
  });

  const [testcases, setTestcases] = useState([
    { input: "", output: "", isHidden: false },
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTestcaseChange = (index, field, value) => {
    const updated = [...testcases];
    updated[index][field] = value;
    setTestcases(updated);
  };

  const addTestcase = () => {
    setTestcases([...testcases, { input: "", output: "", isHidden: false }]);
  };

  const removeTestcase = (index) => {
    const updated = testcases.filter((_, i) => i !== index);
    setTestcases(updated);
  };

  const handleCreateProblem = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8001/problem/create",
        {
          ...form,
          testcases,
        },
        {
          withCredentials: true,
        },
      );
      alert("Problem created successfully!");
      // TODO: replace console.log's
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error creating problem");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create Problem
        </h2>

        <form onSubmit={handleCreateProblem} className="space-y-4">
          <input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="statement"
            placeholder="Problem Statement"
            value={form.statement}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="sampleInput"
            placeholder="Sample Input"
            value={form.sampleInput}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg p-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="sampleOutput"
            placeholder="Sample Output"
            value={form.sampleOutput}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg p-2 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <h3 className="text-lg font-semibold mt-6">Testcases</h3>

          {testcases.map((tc, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 space-y-3"
            >
              <textarea
                placeholder="Input"
                value={tc.input}
                onChange={(e) =>
                  handleTestcaseChange(index, "input", e.target.value)
                }
                rows={3}
                className="w-full border rounded-lg p-2 font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <textarea
                placeholder="Output"
                value={tc.output}
                onChange={(e) =>
                  handleTestcaseChange(index, "output", e.target.value)
                }
                rows={2}
                className="w-full border rounded-lg p-2 font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={tc.isHidden}
                    onChange={(e) =>
                      handleTestcaseChange(index, "isHidden", e.target.checked)
                    }
                  />
                  Hidden
                </label>

                <button
                  type="button"
                  onClick={() => removeTestcase(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addTestcase}
            className="w-full bg-gray-200 hover:bg-gray-300 rounded-lg py-2"
          >
            + Add Testcase
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
          >
            Create Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export { CreateProblem };
