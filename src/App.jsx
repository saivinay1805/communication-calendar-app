// src/App.jsx
import React, { useState, useEffect } from 'react';
import CompanyList from './components/admin/CompanyList';
import AddCompanyModal from './components/admin/AddCompanyModal';
import CommunicationMethodList from './components/admin/CommunicationMethodList';
import AddEditCommunicationMethodModal from './components/admin/AddEditCommunicationMethodModal';
import Dashboard from './components/user/Dashboard';
import CommunicationPerformedModal from './components/user/CommunicationPerformedModal';
import NotificationArea from './components/user/NotificationArea'
import CalendarView from './components/user/CalendarView'
import ReportingArea from './components/reporting/ReportingArea'
import Company from './models/company';
import CommunicationMethod from './models/communicationMethod';
import Communication from './models/communication';
import {add, isPast, isToday} from 'date-fns';
import SearchBar from './components/common/SearchBar'


const App = () => {
    const [loading, setLoading] = useState(true)
  const [companies, setCompanies] = useState(() => {
        const storedCompanies = localStorage.getItem('companies')
      const initialCompanies =  storedCompanies ? JSON.parse(storedCompanies) : [
            new Company('1', 'Tech Innovations Inc.', 'San Francisco', 'linkedin.com/company/tech-innovations', ['info@techinnov.com'], ['123-456-7890'], 'Great potential partner', '2 weeks'),
            new Company('2', 'Global Solutions Ltd.', 'London', 'linkedin.com/company/globalsolutions', ['contact@globalsol.com'], ['+44 20 7946 0000'], 'Established firm', '1 month'),
        ];
      setLoading(false)
      return initialCompanies;

  });
  const [communicationMethods, setCommunicationMethods] = useState(()=> {
      const storedCommunicationMethods = localStorage.getItem('communicationMethods')
        setLoading(false)
        return storedCommunicationMethods ? JSON.parse(storedCommunicationMethods) : getDefaultCommunicationMethods();
  });
  const [communications, setCommunications] = useState(()=> {
     const storedCommunications = localStorage.getItem('communications')
      setLoading(false)
        return storedCommunications ? JSON.parse(storedCommunications) : []
  }); // Add state for communications
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
     const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightOverrides, setHighlightOverrides] = useState(() => {
        const storedOverrides = localStorage.getItem('highlightOverrides')
      return storedOverrides ? JSON.parse(storedOverrides) : {}
    });

    useEffect(()=>{
        localStorage.setItem('companies', JSON.stringify(companies))
    }, [companies])

    useEffect(()=>{
        localStorage.setItem('communicationMethods', JSON.stringify(communicationMethods))
    }, [communicationMethods])

    useEffect(()=>{
        localStorage.setItem('communications', JSON.stringify(communications))
    }, [communications])

  useEffect(()=>{
    localStorage.setItem('highlightOverrides', JSON.stringify(highlightOverrides))
  }, [highlightOverrides])


  function getDefaultCommunicationMethods() {
    return [
      new CommunicationMethod('1', 'LinkedIn Post', 'Post on company\'s LinkedIn page', 1, false),
      new CommunicationMethod('2', 'LinkedIn Message', 'Send a direct message on LinkedIn', 2, false),
      new CommunicationMethod('3', 'Email', 'Send an email', 3, true),
      new CommunicationMethod('4', 'Phone Call', 'Call a representative', 4, true),
      new CommunicationMethod('5', 'Other', 'Other communication method', 5, false),
    ];
  }

  // Company Handlers
  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter(company => company.id !== id));
  };
  const handleAddCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
  };
  const handleEditCompany = (id) => {
    const companyToEdit = companies.find(company => company.id === id);
    setEditingCompany(companyToEdit);
    setIsCompanyModalOpen(true);
  };
  const handleUpdateCompany = (updatedCompany) => {
    setCompanies(companies.map(company =>
      company.id === updatedCompany.id ? updatedCompany : company
    ));
    setEditingCompany(null);
  };
  const handleCloseCompanyModal = () => {
    setIsCompanyModalOpen(false);
    setEditingCompany(null);
  };

  // Communication Method Handlers
  const handleAddMethod = (newMethod) => {
    setCommunicationMethods([...communicationMethods, newMethod]);
  };
  const handleDeleteMethod = (id) => {
    setCommunicationMethods(communicationMethods.filter(method => method.id !== id));
  };
  const handleEditMethod = (id) => {
    const methodToEdit = communicationMethods.find(method => method.id === id);
    setEditingMethod(methodToEdit);
    setIsMethodModalOpen(true);
  };
  const handleUpdateMethod = (updatedMethod) => {
    setCommunicationMethods(communicationMethods.map(method =>
      method.id === updatedMethod.id ? updatedMethod : method
    ));
    setEditingMethod(null);
  };
  const handleCloseMethodModal = () => {
    setIsMethodModalOpen(false);
    setEditingMethod(null);
  };

    // Communication Log Handlers
    const handleLogCommunication = (companyId, methodId, date, notes) => {
        const newCommunication = new Communication(Date.now().toString(), companyId, methodId, date, notes);
        setCommunications([...communications, newCommunication])
    };

  const handleOpenModal = (companyId) => {
      setSelectedCompanyId(companyId)
        setIsModalOpen(true)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompanyId(null)
  }

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

  const handleOverrideHighlight = (companyId) => {
      setHighlightOverrides(prevOverrides => ({
        ...prevOverrides,
        [companyId]: !prevOverrides[companyId]
      }));
    };

     const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    )


  return (
      <div className="font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Communication Tracking Calendar</h1>
      {loading && <p className="text-center">Loading...</p>}
     {!loading && <>
         <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <section className="mb-8 pb-8 border-b border-gray-300">
        <h2 className="text-2xl font-semibold text-center mb-4">Company Management</h2>
        <div className="flex justify-center mb-4">
          <button onClick={() => setIsCompanyModalOpen(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add New Company
          </button>
        </div>
        <CompanyList
          companies={filteredCompanies}
          onDeleteCompany={handleDeleteCompany}
          onEditCompany={handleEditCompany}
        />
        <AddCompanyModal
          isOpen={isCompanyModalOpen}
          onClose={handleCloseCompanyModal}
          onAdd={editingCompany ? handleUpdateCompany : handleAddCompany}
          editingCompany={editingCompany}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Communication Method Management</h2>
        <div className="flex justify-center mb-4">
          <button onClick={() => setIsMethodModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New Method
          </button>
        </div>
        <CommunicationMethodList
          methods={communicationMethods}
          onDeleteMethod={handleDeleteMethod}
          onEditMethod={handleEditMethod}
        />
        <AddEditCommunicationMethodModal
          isOpen={isMethodModalOpen}
          onClose={handleCloseMethodModal}
          onAdd={editingMethod ? handleUpdateMethod : handleAddMethod}
          editingMethod={editingMethod}
        />
      </section>

      <section>
          <Dashboard companies={filteredCompanies} onLogCommunication={handleLogCommunication} communications={communications} onOpenModal={handleOpenModal} highlightOverrides={highlightOverrides} onOverrideHighlight={handleOverrideHighlight}/>
        <CommunicationPerformedModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onLogCommunication={handleLogCommunication}
            companyId={selectedCompanyId}
              communicationMethods={communicationMethods}
        />
      </section>
        <section>
          <NotificationArea companies={filteredCompanies} communications={communications} />
        </section>
      <section>
         <CalendarView communications={communications} companies={filteredCompanies} communicationMethods={communicationMethods}/>
      </section>
        <section>
             <ReportingArea communications={communications} communicationMethods={communicationMethods} />
         </section>
       </>}
    </div>
  );
};

export default App;