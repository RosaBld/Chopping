// Libraries
import { useState, useEffect } from 'react';

// Components
import { DeletePool } from '../utils';

export default function Pool() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('participants')) || {});
  const totalAmount = data.totalAmount;
  const poolName = data.poolName;

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

  return (
    <div>
      <div>
        <h2>Votre cagnotte</h2>
        <h2>{poolName}</h2>
        <p>est de</p>
        <h2>{totalAmount}€</h2>
      </div>
      
      <div>
        <DeletePool />
      </div>
    </div>
  )
}