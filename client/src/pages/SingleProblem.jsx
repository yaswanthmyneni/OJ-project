import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Compiler } from "../components";

const SingleProblem = () => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios(
          `${import.meta.env.VITE_SERVER_BASE_URL}/problem/${id}`,
          {
            withCredentials: true,
          },
        );

        if (!res.data.success) {
          throw new Error(data.message);
        }

        setProblem(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 overflow-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {problem.title}
          </h2>

          <p className="text-gray-600 mb-2">
            <strong>Author:</strong> {problem.author}
          </p>

          <p className="mb-4 text-gray-700 whitespace-pre-wrap">
            {problem.statement}
          </p>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800">Input</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto whitespace-pre-line">
              {problem?.sampleInput.replace(/\\n/g, "\n")}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">Output</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
              {problem?.sampleOutput}
            </pre>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4">
          <Compiler problemId={id} />
        </div>
      </div>
    </div>
  );
};

export { SingleProblem };
