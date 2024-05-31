// Libraries
import { useState, useEffect } from 'react';

// Components
import { DeletePool } from '../utils';

export default function Pool() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('participants')) || {});
  const totalAmount = data.totalAmount;
  const poolName = data.poolName;
  const [existingData, setExistingData] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedData = JSON.parse(localStorage.getItem('participants')) || {};
      if (storedData.totalAmount !== totalAmount || storedData.poolName !== poolName) {
        setData(storedData);
      }
    }, 0);

    return () => {
      clearInterval(intervalId);
    };
  }, [totalAmount, poolName]);

  const handlePoolDeletion = () => {
    setExistingData(false);
  };

  return (
    <div className="poolRemaining">
     
      {existingData && (
        <div className="remaining">
          <h3>Reste</h3>
          <h2>{totalAmount}€</h2>
        </div>
      )}
      <div>
        <DeletePool onPoolDelete={handlePoolDeletion} />
      </div>
    </div>
  )
}