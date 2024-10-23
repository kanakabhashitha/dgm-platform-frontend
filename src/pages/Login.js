import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/auth";

import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email and Password are required");
      return;
    }

    dispatch(userLogin({ email, password }));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <div className="grid h-screen grid-cols-7 bg-gradient-to-tr from-cyan to-blue-950">
      <div className="flex flex-col items-center justify-center col-span-3">
        <img
          className="w-20 mb-5"
          alt="logo"
          src={require("../assets/images/logo.png")}
        />
        <p className="text-lg font-thin tracking-wider text-white">
          Welcome to,
        </p>
        <p className="pt-2 text-2xl font-semibold tracking-wider text-white">
          Danger Gas Monitoring System
        </p>
      </div>

      <div className="flex flex-col items-center justify-center col-span-4 tracking-wider">
        <p className="mb-10 text-2xl tracking-wider text-white">Login</p>

        <form className="w-3/5" onSubmit={onSubmit}>
          <div>
            <label className="block font-light leading-6 tracking-wider text-white text-md">
              UserName | Email
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">
                  <FiUser />
                </span>
              </div>
              <input
                type="email"
                placeholder="Enter user name or email"
                className="block w-full bg-transparent rounded-md border-0 py-1.5 pl-9 text-white ring-1 ring-inset tracking-wider ring-white placeholder:text-gray-400 sm:text-sm sm:leading-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-5">
            <label className="block font-light leading-6 tracking-wider text-white text-md">
              Password
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">
                  <RiLockPasswordLine />
                </span>
              </div>
              <input
                type="password"
                placeholder="Enter password"
                className="block w-full bg-transparent rounded-md border-0 py-1.5 pl-9 text-white ring-1 ring-inset tracking-wider ring-white placeholder:text-gray-400 sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full pt-1.5 pb-1.5 mt-6 font-medium tracking-wider text-white border rounded-md cursor-pointer text-md bg-cyan border-cyan-md hover:border-cyan"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
