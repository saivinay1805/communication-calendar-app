// src/components/user/CommunicationPerformedModal.jsx
import React, { useState, useEffect } from 'react';
import styles from './CommunicationPerformedModal.module.css';
import DatePicker from "react-datepicker";
    import "react-datepicker/dist/react-datepicker.css";

const CommunicationPerformedModal = ({ isOpen, onClose, onLogCommunication, companyId, communicationMethods }) => {
  const [methodId, setMethodId] = useState('');
  const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const [dateError, setDateError] = useState('')
    
    useEffect(() => {
        if(!isOpen){
            setMethodId('')
            setDate(new Date())
            setNotes('')
            setDateError('')
        }
    }, [isOpen])
    
    const validateDate = (selectedDate) => {
         if(isPast(selectedDate)){
            setDate(selectedDate)
            setDateError('')
            return true;
        }else {
             setDateError('Date must be in the past')
             return false;
         }
    }

  const handleSubmit = () => {
      if(validateDate(date)){
         onLogCommunication(companyId, methodId, date.toISOString(), notes);
         onClose();
      }

  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-2/3 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Log Communication</h2>
         <div className="mb-4">
                 <label htmlFor="method" className="block text-gray-700 font-bold mb-2">Communication Method:</label>
                    <select id="method" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={methodId} onChange={(e) => setMethodId(e.target.value)}>
                        <option value=''>Select a method</option>
                    {communicationMethods.map((method)=>(
                        <option value={method.id} key={method.id}>{method.name}</option>
                        ))}
                    </select>
            </div>
             <div className="mb-4">
                  <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date:</label>
                    <DatePicker selected={date} onChange={(date) => validateDate(date)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                      {dateError && <p className="text-red-500 text-sm">{dateError}</p>}
            </div>
            <div className="mb-6">
                <label htmlFor="notes" className="block text-gray-700 font-bold mb-2">Notes:</label>
                <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
             </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
            <button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log Communication</button>
          </div>
        </div>
      </div>
    );
  };

  export default CommunicationPerformedModal;