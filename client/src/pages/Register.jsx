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
    <form className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Register
        </h2>

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={(e) => handleSignup(e)}
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export { Register };
