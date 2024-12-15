import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query); 
  };

  return (
    <div className="flex items-center bg-white bg-opacity-40 p-2 rounded-lg backdrop-blur-md">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
       className="w-full px-4 py-2 rounded-md outline-none"
      />

      <button
        onClick={handleSearch}
                className="ml-2 px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-200 text-white rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;