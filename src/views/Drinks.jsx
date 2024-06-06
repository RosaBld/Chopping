// Libraries
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from 'react';

// Components
import { AddDrinks, CostDrinks, Loading, Pool, TotalDrinks, TotalParticipants } from '../utils';

export default function Drinks() {
  const [isLoading, setIsLoading] = useState(true);
  const [cost, setCost] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Simulate a data loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 2 seconds delay

    const data = JSON.parse(localStorage.getItem('participants')) || {};
    setTotalAmount(data.totalAmount);
  }, []);

  const handleCostChange = (newCost) => {
    setCost(newCost);
  };

  return (
    <div>
      {isLoading ? 
        <div className="homepage">
          <Loading />
        </div> 
      : 
        <div>
          <div style={{ maxHeight: '375px', overflowY: 'auto' }} >
            <AddDrinks />
          </div>

          <div>
            {cost > totalAmount && 
              <div className="errorDiv">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                Le montant total de votre commande est supérieur au total de votre cagnotte!
              </div>
            }
          </div>

          <div className="bill">
            <Pool />
            <div className="total">
              <TotalDrinks />
              <CostDrinks cost={cost} onCostChange={handleCostChange} />
              <TotalParticipants />
            </div>
          </div>
        </div>
      }
    </div>
  )
}