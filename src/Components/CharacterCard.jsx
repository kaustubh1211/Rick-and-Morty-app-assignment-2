import React from 'react'

export default function CharacterCard({character}) {
    if (!character) return <div className="text-center">Loading...</div>;
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm mx-auto">
    <img
      src={character.image}
      alt={character.name}
      className="rounded-lg w-full"
    />
    <h2 className="text-xl font-bold mt-2">{character.name}</h2>
    <p>
      <strong>Status:</strong> {character.status}
    </p>
    <p>
      <strong>Species:</strong> {character.species}
    </p>
  </div>
  )
}
