import React from "react";
import "./home.css";
import img from "../images/bvp.jpeg"
export default function Home() {
  return (
    <>
    <div className="all">
      <img className="bvp" src={img} alt="bvp"/> 
      <div className="gradient"></div>
      
      <div className="headingandimage">
        <div className="text">
          <img
            src="https://th.bing.com/th/id/OIP.nemQWo7f6qUOHs-doBivRAAAAA?rs=1&pid=ImgDetMain"
            alt="logo"
          />
          <h1>Online Grievance Portal</h1>
          <h3>
            BHARATI VIDYAPEETH'S INSTITUTE OF COMPUTER APPLICATIONS & MANAGEMENT
          </h3>
          <h5>
            A-4, Paschim Vihar, Rohtak Road, New Delhi-110 063.<br></br>
          </h5>
          <br></br>
          <p>
            Welcome to the BVICAM Institute Grievance Portal. This platform is
            dedicated to addressing and resolving any issues or concerns you may
            have during your time at BVICAM. We are committed to fostering a
            supportive and transparent environment, ensuring that your voice is
            heard and your grievances are handled promptly and fairly. Whether
            you are a student, faculty member, or staff, we are here to assist
            you and ensure a positive experience within our community.
          </p>
        </div>
      </div>
    </div>
      <div className="howtofile">
        <div className="photo">
          <img
            src="https://www.kitssingapuram.ac.in/grconline/images/1.png"
            alt="Grievance Portal"
          />
        </div>
        <div className="text2">
          <h2>How To File a Grievance</h2>
          <b>Follow the steps below to file a grievance:</b>
          <ol>
            <li>Sign up for an account on the portal.</li>
            <li>Log in with your new account credentials.</li>
            <li>
              You will be redirected to a new page where you need to file a
              grievance.
            </li>
            <li>Fill out the grievance form and simply submit it.</li>
            <li>After submitting, you will receive an email confirmation.</li>
            <li>Check the status of your complaint on your user profile.</li>
            <li>
              When the status of your complaint changes, you will be notified
              accordingly via email.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
