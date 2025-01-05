// src/components/reporting/EngagementEffectivenessDashboard.jsx
import React from 'react';
import styles from './EngagementEffectivenessDashboard.module.css'

const EngagementEffectivenessDashboard = ({ communications, communicationMethods, fromDate, toDate }) => {
    const filteredCommunications = communications.filter(comm => {
        if(!fromDate || !toDate) return true;
        const communicationDate = new Date(comm.date);
        return communicationDate >= new Date(fromDate) && communicationDate <= new Date(toDate)
    })
  const totalCommunications = filteredCommunications.length;
    if (totalCommunications === 0) {
        return  <div className={styles.dashboardContainer}>
                  <h2>Engagement Effectiveness Dashboard</h2>
                     <p>No communications logged for this period.</p>
                 </div>
    }
  const responseRates = communicationMethods.map(method => {
    const methodCommunications = filteredCommunications.filter(comm => comm.methodId === method.id);
    const responseCount = methodCommunications.length; // Placeholder as we don't have response tracking.
    const responseRate = (responseCount / totalCommunications * 100).toFixed(2)
    return {
      methodName: method.name,
      responseRate: responseRate + '%',
    };
  });

  return (
    <div className={styles.dashboardContainer}>
      <h2>Engagement Effectiveness Dashboard</h2>
        <div className={styles.reportSection}>
            {responseRates.map((rate, index) => (
                <p key={index}>
                    {rate.methodName}: {rate.responseRate} (Placeholder: Response data is not tracked)
                 </p>
            ))}
        </div>
    </div>
  );
};

export default EngagementEffectivenessDashboard;