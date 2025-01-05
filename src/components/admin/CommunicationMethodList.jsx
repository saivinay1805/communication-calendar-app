  // src/components/admin/CommunicationMethodList.jsx
  import React from 'react';


  const CommunicationMethodList = ({ methods, onDeleteMethod, onEditMethod }) => {
    const sortedMethods = [...methods].sort((a, b) => a.sequence - b.sequence);

    return (
      <div className="p-5">
        <h2 className="text-xl font-semibold text-center mb-4">Communication Methods</h2>
        {sortedMethods.length === 0 ? (
          <p className="text-center italic text-gray-500">No communication methods defined yet.</p>
        ) : (
          <ul className="list-none p-0">
            {sortedMethods.map(method => (
              <li key={method.id} className="border border-gray-300 p-3 mb-3 rounded bg-gray-100 shadow flex justify-between items-center">
                 <div>
                  <h3 className="text-lg font-bold mb-1">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                       <p className="text-sm text-gray-600">Sequence: {method.sequence}</p>
                      <p className="text-sm text-gray-600">Mandatory: {method.mandatoryFlag ? 'Yes' : 'No'}</p>
                  </div>
                    <div className="flex gap-2">
                  <button onClick={() => onEditMethod(method.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">Edit</button>
                   <button onClick={() => onDeleteMethod(method.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  export default CommunicationMethodList;