import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      dispatch(login(data.user));
      navigate("/");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center h-screen bg-gray-900 text-white"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="bg-gray-800 p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 bg-gray-700 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 bg-gray-700 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
