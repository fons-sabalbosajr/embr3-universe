import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import homelogo from '../public/emblogomenu.png';
import "./home.css";

function Home() {
  return (
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
                <h2><span className="content_span">EMB R3 Universe of Firms Central Database</span></h2>
                <p className="content_alice">A harmonization of different firms and industries within Region III Monitoring Plan</p>               
                  <Link to="/login" className="btn btn-primary">
                    Get Started
                  </Link>
              </div>
          </div>
        </div>
  );
}

export default Home;
