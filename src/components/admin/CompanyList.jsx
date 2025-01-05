// src/components/admin/CompanyList.jsx
import React from 'react';

const CompanyList = ({ companies, onDeleteCompany, onEditCompany }) => {
  return (
    <div className="p-5">
      <h2 className="mb-4 text-xl font-semibold text-center">Company List</h2>
      {companies.length === 0 ? (
        <p className="text-center italic text-gray-500">No companies found.</p>
      ) : (
        <ul className="list-none p-0">
          {companies.map(company => (
            <li key={company.id} className="border border-gray-300 p-3 mb-3 rounded bg-gray-100 shadow">
                <div className="flex justify-between items-center">
                    <div>
                         <h3 className="text-lg font-bold mb-1">{company.name}</h3>
                           <p className="text-sm text-gray-600">Location: {company.location}</p>
                    </div>

                    <div className="flex gap-2">
                       <button onClick={() => onEditCompany(company.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">Edit</button>
                       <button onClick={() => onDeleteCompany(company.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Delete</button>
                     </div>
                </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyList;