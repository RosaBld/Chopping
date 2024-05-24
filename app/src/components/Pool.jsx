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
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [totalAmount, poolName]);

  const handlePoolDeletion = () => {
    setExistingData(false);
  };

  return (
    <div className="poolRemaining">
      <div>
        <DeletePool onPoolDelete={handlePoolDeletion} />
      </div>
  
      {existingData && (
        <div className="remaining">
          <h3>Reste: {totalAmount}€</h3>
        </div>
      )}
    </div>
  )
}