// src/components/user/Dashboard.jsx
import React from 'react';
import CompanyRow from './CompanyRow';
// import styles from './Dashboard.module.css';

const Dashboard = ({ companies, onLogCommunication, communications, onOpenModal }) => {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold text-center mb-4">Communication Dashboard</h2>
      <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
              <thead>
              <tr className="bg-gray-100 text-left">
                  <th className="px-5 py-3  text-gray-800  uppercase font-semibold">Company Name</th>
                  <th className="px-5 py-3  text-gray-800  uppercase font-semibold">Last Five Communications</th>
                  <th className="px-5 py-3  text-gray-800  uppercase font-semibold">Next Scheduled Communication</th>
                  <th className="px-5 py-3  text-gray-800  uppercase font-semibold">Actions</th>
              </tr>
              </thead>
               <tbody>
                   {companies.map(company => (
                      <CompanyRow key={company.id} company={company} onOpenModal={onOpenModal} communications={communications} />
                     ))}
               </tbody>
          </table>
     </div>
    </div>
  );
};

export default Dashboard;