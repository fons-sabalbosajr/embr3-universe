import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
    <div className="bg-white p-3 rounded">
      <p>
        ENVIRONMENTAL MANAGEMENT BUREAU REGION III <br />
        <center>Universe of Firms</center>
      </p>
      <h3>
        <center>SIGN UP</center>
      </h3>
      <form>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Name</strong>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            className="form-control rounded-0"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">
            <strong>Name</strong>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            className="form-control rounded-0"
          />
        </div>
        <button type="submit" className="btn btn-success w-100 rounded-0">
          Login
        </button>
        <p>You are agree to our Terms and Policies</p>
        <Link to="/register" button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
          Create Account
        </Link>
      </form>
    </div>
  </div>
  )
}

export default Login