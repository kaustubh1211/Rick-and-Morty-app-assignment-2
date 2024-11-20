import React, { useState, useEffect } from 'react';
import CharacterCard from './Components/CharacterCard';
import FilterMenue from './Components/FilterMenue';
import SeachBar from './Components/SeachBar';
import EpisodGuide from './Components/EpisodGuide';

function App() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ status: '', species: '' });
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [loader, setLoader] = useState(false);

  const fetchRandomCharacters = async () => {
    try {
      setError('');
      setLoader(true);
      const res = await fetch('https://rickandmortyapi.com/api/character');
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();

      // Select random characters
      const randomCharacters = Array.from({ length: 20 }, () =>
        data.results[Math.floor(Math.random() * data.results.length)]
      );

      setCharacters(randomCharacters);
    } catch (err) {
      console.error(err.message);
      setError('Error fetching characters. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  const searchCharacters = async (name) => {
    const query = new URLSearchParams({
      name,
      ...filters, 
    }).toString();

    await fetchCharacters(`https://rickandmortyapi.com/api/character/?${query}`);
  };

  const fetchCharacters = async (url) => {
    try {
      setLoader(true); 
      setError('');
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setCharacters(data.results);
    } catch (err) {
      console.error(err.message);
      setError('Data not found...');
    } finally {
      setLoader(false); 
    }
  };

  const handleFilterChange = async (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));


    const query = new URLSearchParams({
      ...filters,
      [name]: value,
    }).toString();

    await fetchCharacters(`https://rickandmortyapi.com/api/character/?${query}`);
  };

  useEffect(() => {
    fetchRandomCharacters();
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen p-4 justify-center items-center text-center">
      <a href='/'>
        <h1 className="mb-4 text-3xl font-extrabold text-orange-500 md:text-5xl lg:text-6xl text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r bg-[#ff802b]">
            THE RICKY AND MORTY
          </span>
        </h1>
      </a>

      {/* Toggle Button */}
      <div className="mb-4">
        <button
          onClick={() => setShowEpisodes(!showEpisodes)}
          className="bg-[#e6630a] text-white py-2 px-6 rounded-lg hover:bg-[#f88233] transition duration-200"
        >
          {showEpisodes ? 'Show Characters' : 'Show Episodes'}
        </button>
      </div>

      {/* Conditional Rendering */}
      {showEpisodes ? (
        <EpisodGuide />
      ) : (
        <div>
          <div className="mb-4 items-center justify-center">
            <SeachBar onSearch={searchCharacters} />
            <FilterMenue onFilterChange={handleFilterChange} />
          </div>

          {loader ? ( // Show loader if data is being fetched
            <div className="text-center text-white">Loading...</div>
          ) : error ? (
            <div className=" text-3xl text-white text-center">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
