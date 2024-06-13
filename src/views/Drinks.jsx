// Libraries
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

// Components
import { AddDrinks, CalculatePool, CostDrinks, Loading, Pool, TotalDrinks, TotalParticipants } from '../utils';

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

  const participants = JSON.parse(localStorage.getItem('participants')) || [];

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
        <div className="totalPool">
          {participants.length === 0 ? (
            <div>
              <h2 className="errorDrink">Il ne vous est pas possible d&apos;ajouter une boisson à vorre évènement car aucun évènement n&apos;est en cours. Veuillez créer un <Link to="/">évènement</Link> afin de continuer</h2>
            </div>
          ) : (
              <div>
                <AddDrinks />
              </div>
          )}
          <div>
            {cost > totalAmount && 
              <div className="errorDiv">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                Le montant total de votre commande est supérieur au total de votre cagnotte!
              </div>
            }
          </div>

          <div className="bill">
            <div className="drinksPool">
              <CalculatePool />
              <CostDrinks cost={cost} onCostChange={handleCostChange} />
            </div>
            <div className="total">
              <TotalDrinks />
              <Pool />
              <TotalParticipants />
            </div>
          </div>
        </div>
      }
    </div>
  )
}