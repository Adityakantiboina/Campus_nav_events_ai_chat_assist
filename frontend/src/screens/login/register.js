import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import axios from "axios";
import Alert from "./Alert";
import i from "../../images/logo.jpg"; // Assuming the logo is the same
import styled from 'styled-components';

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let alertMsg = "";
    let alertType = "error";

    // Input validation
    if (!userDetails.name || !userDetails.email || !userDetails.password) {
      alertMsg = "Please fill in all fields";
    } else if (!isValidEmail(userDetails.email)) {
      alertMsg = "Please enter a valid email";
    } else if (!isValidPassword(userDetails.password)) {
      alertMsg = "Password must be at least 6 characters";
    } else {
      try {
        const res = await axios.post("https://campus-nav-backend.onrender.com/register", userDetails);
        alertMsg = "Registration Successful";
        alertType = "success";
        navigate("/");
      } catch (error) {
        alertMsg = "Registration failed. Try again.";
        console.error("Registration error", error);
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
          Register to create a new account and access your personalized dashboard.
        </p>
      </div>

      {/* Right Box */}
      <StyledRightBox>
        <h2 className="text-5xl font-bold mb-16 text-center text-white">Register</h2>

        {alertMessage && <Alert message={alertMessage} type={alertType} />}

        <form onSubmit={handleSubmit} className="w-3/4 space-y-6">
          {/* Username Input */}
          <div className="relative flex justify-center">
            <div className="absolute inset-y-3 left-32 pl-0 flex justify-center">
              <HiOutlineUser className="text-gray-500" />
            </div>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              required
              className="w-80 pl-12 pr-3 py-2 border border-gray-300 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Email Input */}
          <div className="relative flex justify-center">
            <div className="absolute inset-y-3 left-32 pl-0 flex justify-center">
              <HiOutlineMail className="text-gray-500" />
            </div>
            <input
              type="email"
              name="email"
              value={userDetails.email}
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
              value={userDetails.password}
              onChange={handleChange}
              required
              className="w-80 pl-12 pr-3 py-2 border border-gray-300 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Centered Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-32 bg-blue-500 hover:bg-blue-600 mt-4 text-white py-2 px-4 rounded-md font-bold"
            >
              Register
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

export default Register;
