// src/components/user/CompanyRow.jsx
import React, { useState } from 'react';
import { add, isPast, isToday } from 'date-fns';


const CompanyRow = ({ company, onOpenModal, communications, highlightOverrides, onOverrideHighlight }) => {
        const [showNotes, setShowNotes] = useState(null)
    const today = new Date();
      const companyCommunications = communications.filter(log => log.companyId === company.id);
    const lastCommunication = companyCommunications.slice(-1)[0];
    const lastCommunicationDate = lastCommunication ? new Date(lastCommunication.date) : null;

    let nextScheduledCommunication = null;

    if (lastCommunicationDate) {
        const [value, unit] = company.communicationPeriodicity.split(" ");
        if(value && unit) {
              nextScheduledCommunication = new Date (add(lastCommunicationDate, { [unit]: parseInt(value) }));
        }
    }

    const isOverdue = nextScheduledCommunication && isPast(nextScheduledCommunication) && !isToday(nextScheduledCommunication) ;

    const isDueToday = nextScheduledCommunication && isToday(nextScheduledCommunication);


    const rowStyle = highlightOverrides?.[company.id] ? {} : isOverdue ? { backgroundColor: '#ffe0e0' } : isDueToday ? { backgroundColor: '#fffacd' } : {};


    const lastFiveCommunications = companyCommunications.slice(-5).map(comm => ({
      type: comm.methodId,
        date: new Date(comm.date).toLocaleDateString(),
      notes: comm.notes,
    }))

    return (
        <tr className="hover:bg-gray-50" style={rowStyle}>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">{company.name}</td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">
                {lastFiveCommunications.map((comm, index) => (
                    <div key={index} title={comm.notes} className="relative inline-block cursor-help" onMouseEnter={()=>setShowNotes(comm.notes)} onMouseLeave={() => setShowNotes(null)} >
                         {comm.type} - {comm.date}
                    </div>
                ))}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">
                {nextScheduledCommunication ? `${nextScheduledCommunication.toLocaleDateString()}` : 'No upcoming communication'}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">
                 <button onClick={() => onOpenModal(company.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm mr-2">Log Communication</button>
                <button onClick={() => onOverrideHighlight(company.id)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded text-sm">
                     {highlightOverrides?.[company.id] ? 'Enable' : 'Disable'} Highlight
                </button>
            </td>
        </tr>
    );
};

export default CompanyRow;