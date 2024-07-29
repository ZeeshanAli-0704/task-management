import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, userDetails);
      console.log("User profile: ", result.data);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("type", "jwt");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  };

  const responseGoogle = async (response) => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/google-register`, {
        token: response.credential,
      });
      console.log("User profile: ", result.data);
      localStorage.setItem("token", response.credential);
      localStorage.setItem("type", "google");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Google registration failed: ", error);
    }
  };

  let clientId = process.env.REACT_APP_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="container">
        <div className="signupBox">
          <div className="signupTitle">Signup</div>
          <form onSubmit={handleRegisterClick}>
            <input
              type="text"
              className="inputField"
              name="firstName"
              required
              onChange={handleChange}
              value={userDetails.firstName}
              placeholder="First Name"
            />
            <input
              type="text"
              className="inputField"
              name="lastName"
              required
              onChange={handleChange}
              value={userDetails.lastName}
              placeholder="Last Name"
            />
            <input
              type="email"
              className="inputField"
              name="email"
              required
              onChange={handleChange}
              value={userDetails.email}
              placeholder="Email"
            />
            <input
              type="password"
              className="inputField"
              name="password"
              required
              onChange={handleChange}
              value={userDetails.password}
              placeholder="Password"
            />
            <input
              type="password"
              className="inputField"
              name="confirmPassword"
              required
              onChange={handleChange}
              value={userDetails.confirmPassword}
              placeholder="Confirm Password"
            />
            <button type="submit" className="signupButton">Signup</button>
          </form>
          <p className="link">
            Already have an account? <a href="/">Login</a>
          </p>
          <div className="googleLogin">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log('Google Signup Failed');
              }}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;
