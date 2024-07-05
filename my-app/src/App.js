import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home"; // Example: import your Home component
import About from "./components/about"; // Example: import your About component
import Contact from "./components/contact"; // Example: import your Contact component
import Login from "./components/login";
import Signup from "./components/signup";
import AdminLogin from "./components/adminlogin";
import AdminGrievance from "./components/admingrievance";
import AdminUpdate from "./components/adminupdate";
import UserGrievance from "./components/usergrievance";
import UserProfile from "./components/userprofile";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin-grievance" element={<AdminGrievance />} />
          <Route path="/update/:id" element={<AdminUpdate />} /> 
          <Route path="/user-grievance" element={<UserGrievance />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
