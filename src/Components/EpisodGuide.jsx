import React, { useState, useEffect } from "react";

export default function EpisodGuide() {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const fetchEpisodes = async (page) => {
    try {
      setError("");
      const res = await fetch(`https://rickandmortyapi.com/api/episode?page=2`);
      if (!res.ok) throw new Error("Failed to fetch episodes");
      const data = await res.json();
      setEpisodes(data.results);
      setTotalPages(data.info.pages);
    } catch (err) {
      console.error(err.message);
      setError("Error fetching episodes. Please try again.");
    }
  };

  useEffect(() => {
    fetchEpisodes(currentPage);
  }, [currentPage]);
  return (
    <div className="bg-gray-800 min-h-screen p-4">
      <h1 className="text-center text-3xl font-bold mb-4 text-white">
        EPISODES
      </h1>

      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-bold mb-2">{episode.name}</h2>
              <p className="text-gray-600">
                <strong>Air Date:</strong> {episode.air_date}
              </p>
              <p className="text-gray-600">
                <strong>Episode:</strong> {episode.episode}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
