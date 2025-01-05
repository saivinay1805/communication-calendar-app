// src/components/reporting/ReportingArea.jsx
import React, { useState } from 'react';
import CommunicationFrequencyReport from './CommunicationFrequencyReport';
import EngagementEffectivenessDashboard from './EngagementEffectivenessDashboard';
import styles from './ReportingArea.module.css'

const ReportingArea = ({communications, communicationMethods}) => {

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    }
    const handleToDateChange = (e) => {
        setToDate(e.target.value)
    }
  return (
    <div className={styles.reportArea}>
        <h2>Reporting and Analytics</h2>
        <div className={styles.filters}>
            <div className={styles.formGroup}>
                <label htmlFor='fromDate'>From Date</label>
                <input type='date' id='fromDate' value={fromDate} onChange={handleFromDateChange}/>
           </div>
            <div className={styles.formGroup}>
                <label htmlFor='toDate'>To Date</label>
                 <input type='date' id='toDate' value={toDate} onChange={handleToDateChange}/>
            </div>
        </div>
        <div className={styles.reportContainer}>
            <CommunicationFrequencyReport communications={communications} communicationMethods={communicationMethods} fromDate={fromDate} toDate={toDate} />
            <EngagementEffectivenessDashboard communications={communications} communicationMethods={communicationMethods} fromDate={fromDate} toDate={toDate} />
        </div>
    </div>
  );
};

export default ReportingArea;