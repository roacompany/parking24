import React from 'react';

const LocationBar = ({ airport, onAirportClick }) => {
  if (!airport) return null;

  return (
    <div 
      className="bg-gray-100 px-5 py-3 flex items-center justify-between cursor-pointer"
      onClick={onAirportClick}
    >
      <div>
        <p className="font-semibold text-base">{airport.name}</p>
        <p className="text-xs text-gray-600">{airport.location}</p>
      </div>
      <button className="text-sm text-gray-600">변경</button>
    </div>
  );
};

export default LocationBar;