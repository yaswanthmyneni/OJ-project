import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8001/user/login", form, {
      withCredentials: true,
    });
    const res2 = await axios.get("http://localhost:8001/user/dashboard", {
      withCredentials: true,
    });
    if (res2.data.user) {
      navigate("/dashboard");
    }
  };

  return (
    <form>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={(e) => handleLogin(e)}>Login</button>
      <button onClick={() => navigate("/register")}>Signup</button>
    </form>
  );
};

export { Login };
