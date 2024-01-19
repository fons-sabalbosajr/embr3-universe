import axios from "axios";
import React, { useEffect, useState } from "react";
import Universe from "./Universe";
import { Link, useNavigate } from "react-router-dom";
import logo from './assets/logo.svg';
import homelogo from '../public/emblogomenu.png';
import "./home.css";

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
          
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  }, []);
  const handleDelete = () => {
    axios.get("http://localhost:8081/logout")
    .then(res => {
      location.reload(true);
    }).catch(err => console.log(err));
  }
  return (
    <div className="container mt-4">
      {auth ? (
        <div>
          <h3>You are logged in, {name}</h3>
          <button className="btn btn-danger" onClick={handleDelete}>
            Logout
          </button>
        </div>
      ) : (
        <div className="container">
          <nav>
            <div className="logo_container">
              <img src={homelogo} width="44" height="43" viewBox="0 0 44 43" fill="none" />
            </div>

            <div className="menu_container">
              <ul>
                <li><a href="home" className="active">About the Universe</a></li>
                <li><a href="home" className="active">Contact</a></li>
              </ul>
            </div>
          </nav>

          <div className="content">
              <div class="hero-text">
                <p className="content_para">ENVIRONMENTAL MANAGEMENT BUREAU REGION III</p>
                <h2><span className="content_span">EMB Universe of Firms Central Database</span></h2>
                <p className="content_alice">A harmonization of different firms and industries within Region III Monitoring Plan</p>               
                  <Link to="/login" className="btn btn-primary">
                    Get Started
                  </Link>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
