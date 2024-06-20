// Libraries
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function Pool({ page }) {
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
  
  console.log(page);

  const poolStyle = page === '/budget' ? 'poolRemainingBudget' : 'poolRemaining';

  return (
    <div className={poolStyle}>
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

Pool.propTypes = {
  page: PropTypes.string.isRequired,
};