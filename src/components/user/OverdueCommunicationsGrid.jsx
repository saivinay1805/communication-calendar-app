// src/components/user/OverdueCommunicationsGrid.jsx
import React from 'react';

const OverdueCommunicationsGrid = ({ companies }) => {
  if (companies.length === 0) {
    return <p className="text-center italic text-gray-500">No overdue communications.</p>;
  }
  return (
      <div className="flex-1 p-3 border border-gray-300 rounded">
         <h3 className="mb-2 font-semibold text-gray-700">Overdue Communications</h3>
        <ul className="list-none p-0">
          {companies.map(company => (
            <li key={company.id} className="p-2 border-b border-gray-200">
                {company.name}
            </li>
          ))}
       </ul>
      </div>
  );
};

export default OverdueCommunicationsGrid;