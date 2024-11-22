import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import axios from "axios";
import Cookies from "js-cookie";
import Alert from "./Alert";
import i from "../../images/logo.jpg";
import styled from 'styled-components';

const Login = () => {
  const [login, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let alertMsg = "";
    let alertType = "error";

    if (!login.email && !login.password) {
      alertMsg = "Please enter all details";
    } else if (!login.email) {
      alertMsg = "Please enter email to continue";
    } else if (!isValidEmail(login.email)) {
      alertMsg = "Please enter a valid email";
    } else if (!login.password) {
      alertMsg = "Please enter a password to continue";
    } else if (!isValidPassword(login.password)) {
      alertMsg = "Please enter a valid password (minimum 6 characters)";
    } else {
      try {
        const res = await axios.post("http://localhost:5000/login", login);
        console.log(res.data);
        alertMsg = "Login Successful";
        alertType = "success";
        navigate("/home");
        Cookies.set("token", res.data.token);
      } catch (error) {
        alertMsg = "Invalid Credentials";
        console.error("Login error", error);
      }
    }

    if (alertMsg) {
      setAlertMessage(alertMsg);
      setAlertType(alertType);
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) => password.length >= 6;

  return (
    <div className="h-screen flex">
      {/* Left Box */}
      <div className="w-1/2 bg-gray-900 flex flex-col justify-center items-center p-8">
        <div className="w-40 h-40 mb-6 border rounded-[100px] border-black overflow-hidden">
          <img src={i} alt="Logo" className="w-40 h-40" />
        </div>
        <h1 className="text-3xl font-bold text-white">Welcome to VIT AP!</h1>
        <p className="text-white mt-2 text-center">
          Login to continue accessing your personalized dashboard.
        </p>
      </div>

      {/* Right Box */}
      <StyledRightBox>
        <h2 className="text-5xl font-bold mb-16 text-center text-white">Login</h2>

        {alertMessage && <Alert message={alertMessage} type={alertType} />}

        <form onSubmit={handleSubmit} className="w-3/4 space-y-6">
          {/* Email Input */}
          <div className="relative flex justify-center">
            <div className="absolute inset-y-3 left-32 pl-0 flex justify-center">
              <HiOutlineMail className="text-gray-500" />
            </div>
            <input
              type="email"
              name="email"
              value={login.email}
              onChange={handleChange}
              required
              className="w-80 pl-12 pr-3 py-2 border border-gray-300 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="relative flex justify-center">
            <div className="absolute inset-y-3 left-32 pl-0 flex justify-center">
              <HiOutlineLockClosed className="text-gray-500" />
            </div>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              required
              className="w-80 pl-12 pr-3 py-2 border border-gray-300 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 ml-28 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
          </div>

          {/* Don't have an account? Sign Up Link */}
          <div className="flex justify-center mt-4">
            <p className="text-sm text-white">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500 hover:text-blue-600">
                Sign Up
              </a>
            </p>
          </div>

          {/* Centered Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-32 bg-blue-500 hover:bg-blue-600 mt-4 text-white py-2 px-4 rounded-md font-bold"
            >
              Login
            </button>
          </div>
        </form>
      </StyledRightBox>
    </div>
  );
};

const StyledRightBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #111827;
  background-image: radial-gradient(rgba(255, 255, 255, 0.171) 2px, transparent 0);
  background-size: 30px 30px;
  background-position: -5px -5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 1); /* Black shadow */
`;

export default Login;
