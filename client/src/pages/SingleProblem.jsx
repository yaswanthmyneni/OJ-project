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
        const res = await axios(`http://localhost:8001/problem/${id}`, {
          withCredentials: true,
        });

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
    <div>
      <h2>{problem.title}</h2>
      <p>
        <strong>Author:</strong> {problem.author}
      </p>
      <p>{problem.statement}</p>

      <h3>Input</h3>
      <pre>{JSON.stringify(problem.input, null, 2)}</pre>

      <h3>Output</h3>
      <pre>{JSON.stringify(problem.output, null, 2)}</pre>

      <Compiler />
    </div>
  );
};

export { SingleProblem };
