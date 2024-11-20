import React from 'react'
import { useState } from 'react';

export default function SeachBar({onSearch}) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim()) {
          onSearch(query);
        }
      };
  return (
    <div className="flex items-center gap-2 bg-white shadow-md p-2 rounded-lg max-w-md mx-auto">
    <input
      type="text"
      className="border-none outline-none flex-grow p-2 text-gray-700 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400"
      placeholder="Search characters..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <button
      className="bg-[#f08d49] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#e6630a] transition duration-200"
      onClick={handleSearch}
    >
      Search
    </button>

    

  </div>
   
  )
}
