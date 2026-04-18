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
      const { data } = await axios.post("http://localhost:8001/compile/run", {
        lang,
        code,
      });

      setOutput(data.output);
    } catch (error) {
      console.log(error?.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Online Code Compiler</h1>

      <select
        value={language}
        onChange={(e) => handleLanguage(e)}
        className="border p-2 mb-3"
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="javascript">Javascript</option>
      </select>

      <div
        style={{ width: "800px", height: "400px", border: "1px solid #ccc" }}
      >
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2"
      >
        Run
      </button>

      {output && <pre className="mt-4 bg-gray-100 p-3 w-[800px]">{output}</pre>}
    </div>
  );
}

export { Compiler };
