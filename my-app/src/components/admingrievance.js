import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./admingrievance.css";
import GrievancePieChart from './GrievancePieChart';

const Admingrievance = () => {
  const [grievances, setGrievances] = useState([]);
  // const [isadmin , setisadmin] = useState(localStorage.getItem("isAdmin"))
  const [seenCount , setSeenCount] = useState(0);
  const [notSeenCount , setNotSeenCount] = useState(0) ;

  useEffect(() => {
    const fetchGrievance = async () => {
      try {
        const response = await fetch("http://localhost:4000/grievancedata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          const sortedGrievances = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          const seen = data.filter(grievance => grievance.status === "Seen").length;
          const notSeen = data.filter(grievance => grievance.status === "Not seen").length;

          setSeenCount(seen);
          setNotSeenCount(notSeen);
          setGrievances(sortedGrievances);

        } else {
          console.error("Failed to fetch grievance data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchGrievance();
  }, []);

  // const handleLogout = async (isadmin) => {
  //   localStorage.setItem("isAdmin","False") 
  // }
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the resource");
      }
      // Update the state to reflect the deletion
      setGrievances((prevGrievances) =>
        prevGrievances.filter((grievance) => grievance._id !== id)
      );
      console.log("Grievance deleted successfully");
    } catch (error) {
      console.error("Error deleting the grievance:", error);
    }
  };

  return (
    <div className='admin1'>
      <GrievancePieChart seenCount={seenCount} notSeenCount={notSeenCount}/>
      <table className="Gtable table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Names</th>
            <th>Enrollment No.</th>
            <th>Email</th>
            <th>Grievance</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {grievances.map((grievance, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{grievance.name}</td>
              <td>{grievance.enrollment_no}</td>
              <td>{grievance.email}</td>
              <td>{grievance.grievance}</td>
              <td className={grievance.status === "Not seen" ? "red-text" : "green-text"}>{grievance.status}</td>
              <td>{grievance.feedback}</td>
              <td>{new Date(grievance.date).toLocaleDateString()}</td>
              <td>
                <Link to={`/update/${grievance._id}`} className="action update">Update</Link>
                <button onClick={() => handleDelete(grievance._id)} className="action delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default Admingrievance;
