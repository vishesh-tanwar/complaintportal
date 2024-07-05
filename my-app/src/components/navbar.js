// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./navbar.css";

// function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authtoken"));
//   const [isadminIn, setadminIn] = useState(!!localStorage.getItem("isAdmin")) 

//   const handleLogout = () => {
    
//     localStorage.removeItem("authtoken");
//     setIsLoggedIn(false);
//     setadminIn(false) ;
//   };

//   useEffect(() => {
//     setIsLoggedIn(!!localStorage.getItem("authtoken"));
//   }, []); // Empty dependency array to run the effect only once on component mount

//   return (
//     <nav className="navbar">
//       <div className="con">
//         <div className="nav-section">
//           <ul className="navbar-links">
//             <li> 
//               <Link to="/">Home</Link>
//             </li> 
//             {isLoggedIn ? (
//               <>
//                 <li>
//                   <Link to="/user-grievance">File Grievance</Link>
//                 </li>
//                 <li>
//                   <Link to="/user-profile">My Profile</Link>
//                 </li>
//               </>
//             ) : (
//               <>
//               </>
//             )}
//             {isadminIn ? (
//               <li>
//               <Link to="/admin-grievance">Grievance Portal</Link>
//             </li>
//             ) : (
//               <></> 
//             )}
//           </ul>
//         </div>
//         <div className="nav-section">
//           <ul className="navbar-links">
//             {isLoggedIn || isadminIn ? (
//               <li>
//                 <Link to="/login" onClick={handleLogout}>Logout</Link>
//               </li>
//             ) : (
//               <>
//                 <li>
//                   <Link to="/login">Login</Link>
//                 </li>
//                 <li>
//                   <Link to="/signup">Sign Up</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authtoken"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authtoken"));
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <nav className="navbar">
      <div className="con">
        <div className="nav-section">
          <ul className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn && !isAdmin && (
              <>
                <li>
                  <Link to="/user-grievance">File Grievance</Link>
                </li>
                <li>
                  <Link to="/user-profile">My Profile</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <li>
                <Link to="/admin-grievance">Grievance Portal</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="nav-section">
          <ul className="navbar-links">
            {(isLoggedIn || isAdmin) ? (
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
