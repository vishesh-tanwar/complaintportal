import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const Adminupdate = () => {
  const history = useNavigate();
  const { id } = useParams();

  const [grievance, setGrievance] = useState("");
  const [feedback, setFeedback] = useState("");  

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/grievance/" + id);
        const data = await res.json();
        setGrievance(data.grievance);
        setFeedback(data.feedback); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    try {
      const res = await fetch("http://localhost:4000/update/" + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'Seen',
          feedback: feedback
        })
      });
      console.log(res);
      history('/admin-grievance');
    } catch (error) {
      console.error('Error updating grievance:', error);
    }
  };

  return (
    <div>
      <form className="box" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="grievance">Grievance</label>
          <input type="text" className="form-control" id="grievance" value={grievance} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input type="text" className="form-control" id="status" value="Seen" readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="feedback">Feedback</label>
          <input type="text" className="form-control" id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" >Update</button>
      </form>
    </div>
  );
};

export default Adminupdate;

