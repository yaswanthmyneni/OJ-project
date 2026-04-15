import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const goToProduct = (id) => {
    navigate(`/problem/${id}`);
  };

  const fetchProblems = async () => {
    try {
      const res = await axios.get("http://localhost:8001/problem/", {
        withCredentials: true,
      });
      setProblems(res.data.problems);
    } catch (err) {
      console.error("Error fetching problems:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Problems</h2>

      {problems.length === 0 ? (
        <p>No problems found</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Statement</th>
              <th>IO</th>
              {/* <th>Created At</th> */}
            </tr>
          </thead>

          <tbody>
            {problems.map((problem) => (
              <tr key={problem._id}>
                <td>{problem.title}</td>
                <td>{problem.author}</td>
                <td onClick={() => goToProduct(problem._id)}>
                  {problem.statement.length > 100
                    ? problem.statement.substring(0, 100) + "..."
                    : problem.statement}
                </td>
                <td>
                  <details>
                    <summary>View IO</summary>
                    <pre>{JSON.stringify(problem.input, null, 2)}</pre>
                    <pre>{JSON.stringify(problem.output, null, 2)}</pre>
                  </details>
                </td>
                {/* <td>{new Date(problem.createdAt).toLocaleString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export { ProblemsList };
