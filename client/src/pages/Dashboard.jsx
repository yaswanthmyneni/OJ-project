import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
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
      <button onClick={(e) => handleLogout(e)}>logout</button>
    </>
  );
}
