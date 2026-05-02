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
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/problem/`,
        {
          withCredentials: true,
        },
      );
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Problems</h2>

      {problems?.length === 0 ? (
        <p className="text-gray-600">No problems found</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">Statement</th>
              </tr>
            </thead>

            <tbody>
              {problems?.map((problem) => (
                <tr
                  key={problem._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-blue-600">
                    {problem.title}
                  </td>

                  <td className="p-3 text-gray-700">{problem.author}</td>

                  <td
                    className="p-3 text-gray-600 cursor-pointer"
                    onClick={() => goToProduct(problem._id)}
                  >
                    {problem.statement.length > 100
                      ? problem.statement.substring(0, 100) + "..."
                      : problem.statement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export { ProblemsList };
