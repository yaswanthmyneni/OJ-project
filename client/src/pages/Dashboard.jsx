import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/user/logout`, {
      withCredentials: true,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Dashboard</h1>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-4">
        <button
          onClick={() => navigate("/create-problem")}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Create Problem
        </button>

        <button
          onClick={() => navigate("/problem")}
          className="hover:bg-green-700 text-white py-2 rounded-lg bg-green-600 transition cursor-pointer"
        >
          Problems
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export { Dashboard };
