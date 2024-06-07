// Libraries
import { useState, useEffect } from 'react';

// Components
import { DeletePool } from '../utils';

export default function Pool() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('participants')) || {});
  const [existingData, setExistingData] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedData = JSON.parse(localStorage.getItem('participants')) || {};
      if (storedData.totalAmount !== data.totalAmount || storedData.poolName !== data.poolName) {
        setData(storedData);
      }
    }, 0);

    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  const handlePoolDeletion = () => {
    setExistingData(false);
  };

  return (
    <div className="poolRemaining">
      {existingData && (
        <div className="remaining">
          <h3>Reste</h3>
          {(data.totalAmount === undefined || data.totalAmount === null) ? (
            <h2>0€</h2>
          ) : (
            <h2>{data.totalAmount}€</h2>
          )} 
        </div>
      )}
      <div>
        <DeletePool onPoolDelete={handlePoolDeletion} />
      </div>
    </div>
  )
}