// src/components/common/SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search companies..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default SearchBar;