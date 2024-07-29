import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const enterEmail = (e) => {
    setUserCredentials((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  const enterPassword = (e) => {
    setUserCredentials((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };

  const handleLoginClick = async () => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, userCredentials);
      console.log("User profile: ", result.data);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("type", "jwt");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  const responseGoogle = async (response) => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/google`, {
        token: response.credential,
      });
      console.log("User profile: ", result.data);
      localStorage.setItem("token", response.credential);
      localStorage.setItem("type", "google");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Google login failed: ", error);
    }
  };

  let clientId = process.env.REACT_APP_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="container">
        <div className="loginBox">
          <div className="loginTitle">Login</div>
          <input
            type="text"
            className="inputField"
            onChange={enterEmail}
            value={userCredentials.email}
            placeholder="Email"
          />
          <input
            type="password"
            className="inputField"
            onChange={enterPassword}
            value={userCredentials.password}
            placeholder="Password"
          />
          <button className="loginButton" onClick={handleLoginClick}>
            Login
          </button>
          <p className="link">
            Don't have an account? <a href="/Register">Signup</a>
          </p>
          <div className="googleLogin">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
