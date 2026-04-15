import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8001/user/signup", form, {
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
      <button onClick={(e) => handleSignup(e)}>Register</button>
    </form>
  );
};

export { Register };
