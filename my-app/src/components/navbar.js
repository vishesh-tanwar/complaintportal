import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authtoken"));

  const handleLogout = () => {
    
    localStorage.removeItem("authtoken");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authtoken"));
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <nav className="navbar">
      <div className="con">
        <div className="nav-section">
          <ul className="navbar-links">
            <li> 
              <Link to="/">Home</Link>
            </li> 
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/user-grievance">File Grievance</Link>
                </li>
                <li>
                  <Link to="/user-profile">My Profile</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="nav-section">
          <ul className="navbar-links">
            {isLoggedIn ? (
              <li>
                <Link to="/login" onClick={handleLogout}>Logout</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
