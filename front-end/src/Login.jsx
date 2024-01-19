import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import homelogo from "../public/emblogomenu.png";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.email.trim() || !values.password.trim()) {
      alert("Email or password cannot be empty");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8081/login", values);

      console.log("Login Response:", response); // Log the entire response object

      if (response.data && response.data.Status === "Success") {
        console.log("Login Successful");
        navigate("/universe");
      } else {
        const errorMessage =
          response.data && response.data.Error !== undefined
            ? response.data.Error
            : "An unexpected error occurred during login";

        console.error("Login Error:", errorMessage); // Log the error message
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error during login:", error); // Log the error details
      alert("An error occurred during login");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded-10">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={homelogo} width="100" height="100" alt="Logo" />
        </div>
        <p>
          <br />
          ENVIRONMENTAL MANAGEMENT BUREAU REGION III <br />
          <center>Universe of Firms</center>
        </p>
        <h3>
          <center>SIGN-IN</center>
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
          <p>You are agree to our Terms and Policies</p>
          <Link
            to="/register"
            button
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
