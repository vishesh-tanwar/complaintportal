import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();
      localStorage.setItem("authtoken", data.authtoken);
      console.log(localStorage.getItem("authtoken"));
      history("/user-grievance");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="box1">
        <div className="image">
          <img src="https://cdn-icons-png.flaticon.com/512/6514/6514543.png" alt="user logo"/>
        </div>
        <div className="form-container">
          <h1>User Login</h1>
          <br></br>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control margin5"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="button" onClick={loginUser}>
              Submit
            </button>
          </form>
          <br />
          <NavLink to="/signup" className="signup-image-link">
            New User ?
          </NavLink>
          <NavLink to="/adminlogin" className="admin">
            Login As Admin
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Login;
