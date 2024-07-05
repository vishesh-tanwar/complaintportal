import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const history = useNavigate();
  const [user, setUser] = useState({
    enrollment_no: "",
    name: "",
    father_name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
 
  const PostData = async (event) => {
    event.preventDefault();
    try {
      const { enrollment_no, name, father_name, email, mobile, password } = user;
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enrollment_no,
          name,
          father_name,
          email,
          mobile,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        window.alert(data.message); // Registration successful message
        history("/login"); // Redirect to login page
      } else {
        window.alert(data.error); // Display error message
        console.error("Registration failed:", data.error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      window.alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="box">
      <form className="form">
        <h1>Registration</h1>
        <br/> 
        <div className="col-md-6">
           <label htmlFor="enrollment_no" className="form-label">
             Enrollment Number 
           </label>
           <input type="number" className="form-control" name="enrollment_no" id="enrollment_no" value={user.enrollment_no} onChange={handleInputs} />
         </div>
         <div className="col-md-6">
           <label htmlFor="name" className="form-label">
             Name
           </label>
           <input type="text" className="form-control" name="name" id="name" value={user.name} onChange={handleInputs} />
         </div>
         <div className="col-md-6">
           <label htmlFor="father_name" className="form-label">
             Father Name
           </label>
           <input type="text" className="form-control" name="father_name" id="father_name" value={user.father_name} onChange={handleInputs} />
         </div>
         <div className="col-md-6">
           <label htmlFor="email" className="form-label">
             Email
           </label>
           <input type="email" className="form-control" name="email" id="email" value={user.email} onChange={handleInputs} />
         </div>
         <div className="col-md-6">
           <label htmlFor="mobile" className="form-label">
             Mobile
           </label>
           <input type="number" className="form-control" name="mobile" id="mobile" value={user.mobile} onChange={handleInputs} />
         </div>
         <div className="col-md-6">
           <label htmlFor="password" className="form-label">
             Password
           </label>
           <input type="password" className="form-control" name="password" id="password" value={user.password} onChange={handleInputs} />
         </div>
         <div className="col-12">
           <button type="submit" name="register" id="register" onClick={PostData} className="btn">
             Register
           </button>
         </div>
         <div className="link">
        <NavLink to="/login" className="link">Already Registered?</NavLink>
          </div>
      </form>
      <br />
    </div>
  );
};

export default Signup;
