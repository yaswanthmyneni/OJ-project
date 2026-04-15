import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get("http://localhost:8001/user/logout", {
      withCredentials: true,
    });
    navigate("/");
  };

  return (
    <>
      <h1>hello</h1>
      <button onClick={() => navigate("/create-problem")}>
        Create Problem
      </button>
      <button onClick={() => navigate("/problem")}>
        Problems
      </button>
      <button onClick={(e) => handleLogout(e)}>logout</button>
    </>
  );
};

export { Dashboard };
