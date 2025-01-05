// src/components/user/TodaysCommunicationsGrid.jsx
import React from 'react';
import styles from './TodaysCommunicationsGrid.module.css'

const TodaysCommunicationsGrid = ({ companies, communications }) => {
    if (companies.length === 0) {
      return <p className={styles.noDueToday}>No communications due today.</p>;
    }
    return (
        <div className={styles.todayGrid}>
           <h3 className={styles.todayTitle}>Today's Communications</h3>
          <ul className={styles.companyList}>
             {companies.map(company => (
               <li key={company.id} className={styles.companyItem}>
                    {company.name}
               </li>
              ))}
        </ul>
        </div>
    );
};

export default TodaysCommunicationsGrid;