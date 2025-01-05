// src/components/admin/AddEditCommunicationMethodModal.jsx
import React, { useState, useEffect } from 'react';
import CommunicationMethod from '../../models/communicationMethod';
import { v4 as uuidv4 } from 'uuid';

const AddEditCommunicationMethodModal = ({ isOpen, onClose, onAdd, editingMethod }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sequence, setSequence] = useState('');
  const [mandatoryFlag, setMandatoryFlag] = useState(false);

    useEffect(() => {
      if (editingMethod) {
        setName(editingMethod.name);
        setDescription(editingMethod.description);
        setSequence(editingMethod.sequence);
        setMandatoryFlag(editingMethod.mandatoryFlag);
      } else {
        setName('');
        setDescription('');
        setSequence('');
        setMandatoryFlag(false);
      }
    }, [editingMethod]);

  const handleSubmit = () => {
    const methodData = {
      id: editingMethod?.id || uuidv4(),
      name: name,
      description: description,
      sequence: parseInt(sequence, 10),
      mandatoryFlag: mandatoryFlag,
    };
    onAdd(methodData);
    onClose();
  };

  if (!isOpen) return null;

  return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-2/3 max-w-2xl">
               <h2 className="text-2xl font-semibold mb-6 text-center">{editingMethod ? 'Edit Communication Method' : 'Add New Communication Method'}</h2>
              <div className="mb-4">
                 <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                   <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
              </div>
              <div className="mb-4">
                   <label htmlFor="sequence" className="block text-gray-700 font-bold mb-2">Sequence:</label>
                    <input type="number" id="sequence" value={sequence} onChange={(e) => setSequence(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
              <div className="mb-4 flex items-center gap-2">
                    <label className="text-gray-700 font-bold">
                    Mandatory:
                        <input type="checkbox" checked={mandatoryFlag} onChange={(e) => setMandatoryFlag(e.target.checked)} className="ml-2 shadow appearance-none border rounded focus:outline-none focus:shadow-outline" />
                     </label>
                </div>
                <div className="flex justify-end gap-4">
                   <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
                    <button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {editingMethod ? 'Update Method' : 'Add Method'}
                     </button>
                 </div>
           </div>
       </div>
  );
};

export default AddEditCommunicationMethodModal;