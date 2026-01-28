import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import LoadingSpinner from '../common/LoadingSpinner';

const AirportModal = ({ isOpen, onClose, onSelect, currentAirportId }) => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAirports();
    }
  }, [isOpen]);

  const fetchAirports = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'airports'),
        where('isActive', '==', true)
      );
      const snapshot = await getDocs(q);
      const airportData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAirports(airportData);
    } catch (error) {
      console.error('공항 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (airport) => {
    onSelect(airport);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-w-mobile mx-auto rounded-t-3xl pb-6">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-lg font-bold">공항 선택</h3>
          <button onClick={onClose} className="text-2xl font-light">×</button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <ul>
              {airports.map(airport => (
                <li key={airport.id}>
                  <button
                    onClick={() => handleSelect(airport)}
                    className={`w-full text-left px-5 py-4 hover:bg-gray-50 ${
                      currentAirportId === airport.id ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{airport.name}</p>
                        <p className="text-sm text-gray-600">{airport.location}</p>
                      </div>
                      {currentAirportId === airport.id && (
                        <span className="text-black">✓</span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AirportModal;