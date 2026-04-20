import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

function Compiler() {
  const [code, setCode] = useState(`// C++ program
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`);
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
    switch (e.target.value) {
      case "javascript":
        setCode(`// javascript program
console.log("Hello, World!");`);
        break;
      case "python":
        setCode(`# python program
print("Hello, World!")`);
        break;
      default:
        setCode(`// C++ program
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`);
    }
  };

  const handleSubmit = async () => {
    let lang = "";
    if (language === "javascript") {
      lang = "js";
    } else if (language === "python") {
      lang = "py";
    } else {
      lang = "cpp";
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8001/compile/run",
        {
          lang,
          code,
          input,
        },
        {
          withCredentials: true,
        },
      );

      setOutput(data.output);
    } catch (error) {
      console.log(error?.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Code Editor
      </h1>
      <select
        value={language}
        onChange={(e) => handleLanguage(e)}
        className="w-[10rem] border p-2 rounded focus:ring-2 focus:ring-blue-500"
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="javascript">Javascript</option>
      </select>
      <div className="border rounded overflow-hidden h-[400px]">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
        />
      </div>
      <textarea
        placeholder="Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded h-24 resize-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="w-[20rem] bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition cursor-pointer"
      >
        Run Code
      </button>
      {output && (
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
          {output}
        </pre>
      )}
    </div>
  );
}

export { Compiler };
