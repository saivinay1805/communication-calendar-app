// src/components/reporting/CommunicationFrequencyReport.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './CommunicationFrequencyReport.module.css';


const CommunicationFrequencyReport = ({ communications, communicationMethods, fromDate, toDate }) => {

    const filteredCommunications = communications.filter(comm => {
        if(!fromDate || !toDate) return true;
        const communicationDate = new Date(comm.date);
        return communicationDate >= new Date(fromDate) && communicationDate <= new Date(toDate)
    })


  const methodCounts = filteredCommunications.reduce((acc, comm) => {
      acc[comm.methodId] = (acc[comm.methodId] || 0) + 1;
    return acc;
  }, {});

    const data = Object.entries(methodCounts).map(([methodId, count])=>{
        const method = communicationMethods.find(m=>m.id === methodId)
        return {name: method?.name || 'N/A', count}
    })

  return (
    <div className={styles.reportContainer}>
      <h2>Communication Frequency Report</h2>
       <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommunicationFrequencyReport;