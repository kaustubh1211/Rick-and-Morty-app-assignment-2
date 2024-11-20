import React from 'react'

export default function FilterMenue({onFilterChange}) {
    const handleChange = (e) => {
        onFilterChange(e.target.name, e.target.value);
      };
    
  return (
    <div className="flex gap-4 mt-4 justify-center items-center">
    <select
      name="status"
      className="border p-2 rounded-lg"
      onChange={handleChange}
    >
      <option value="">All Status</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>
    <select
      name="species"
      className="border p-2 rounded-lg"
      onChange={handleChange}
    >
      <option value="">All Species</option>
      <option value="Human">Human</option>
      <option value="Alien">Alien</option>  
    </select>
  </div>
  )
}
