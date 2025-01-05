// src/components/admin/AddCompanyModal.jsx
import React, { useState, useEffect } from 'react';
import Company from '../../models/company';
  import { v4 as uuidv4 } from 'uuid';

const AddCompanyModal = ({ isOpen, onClose, onAdd, editingCompany }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
      if (editingCompany) {
        setName(editingCompany.name);
        setLocation(editingCompany.location);
      } else {
        setName('');
        setLocation('');
      }
    }, [editingCompany]);

  const handleSubmit = () => {
    const companyData = {
      id: editingCompany?.id || uuidv4(),
      name: name,
      location: location,
      linkedinProfile: editingCompany?.linkedinProfile || '',
      emails: editingCompany?.emails || [],
      phoneNumbers: editingCompany?.phoneNumbers || [],
      comments: editingCompany?.comments || '',
      communicationPeriodicity: editingCompany?.communicationPeriodicity || '2 weeks',
    };
    onAdd(companyData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-2/3 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">{editingCompany ? 'Edit Company' : 'Add New Company'}</h2>
          <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
              <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location:</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
          <button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {editingCompany ? 'Update Company' : 'Add Company'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;