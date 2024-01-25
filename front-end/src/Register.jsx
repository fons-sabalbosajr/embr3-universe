import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import homelogo from "../public/emblogomenu.png";

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation check for empty name, email, or password
    if (
      !values.name.trim() ||
      !values.email.trim() ||
      !values.password.trim()
    ) {
      alert("Name, email, and password cannot be empty");
      return;
    }

    axios
      .post("http://localhost:8081/register", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("Account created successfully!");
          navigate("/login");
        } else {
          alert("Error");
        }
      })
      .then((err) => console.log(err));
  };

  return (
    <div className="background-login">
      <div className="background-form">
        <div className="form">
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
            <center>Universe Central Database System</center>
          </p>
          <h3>
            <center>SIGN-UP</center>
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                className="form-control rounded-0"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
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
              Sign Up
            </button>
            <p>You are agree to our Terms and Policies</p>
            <Link
              to="/login"
              className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            >
              Back to Log In
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
