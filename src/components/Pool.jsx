// Libraries
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

export default function Pool() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('participants')) || {});
  const [existingData] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedData = JSON.parse(localStorage.getItem('participants')) || {};
      if (storedData.totalAmount !== data.totalAmount) {
        setData(storedData);
      }
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  return (
    <div className="poolRemaining">
      {existingData && (
        <div className="remaining">
          <FontAwesomeIcon icon={faScaleBalanced} />
          {(data.totalAmount === undefined || data.totalAmount === null) ? (
            <p>0€</p>
          ) : (
            <p>{data.totalAmount}€</p>
          )} 
        </div>
      )}
    </div>
  )
}