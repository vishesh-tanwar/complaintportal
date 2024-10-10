import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GrievancePieChart = ({ seenCount, notSeenCount }) => {
  const data = {
    labels: ['Seen', 'Not Seen'],
    datasets: [
      {
        label: 'Grievance Status',
        data: [seenCount, notSeenCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div style={{ width: '250px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.2em' }}>Grievance Status Chart</h2>
      <Pie data={data} style={{marginBottom : "9px"}}/> 
    </div>
  );
};

export default GrievancePieChart;
