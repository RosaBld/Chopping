import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Loading, Order, Pool } from "../utils";


export default function Budget() {

  const participants = JSON.parse(localStorage.getItem('participants')) || [];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a data loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 2 seconds delay
  });

  return (
    <div>
      {isLoading ? 
        <div className="charging">
          <Loading />
        </div>
        :
        <div className="budgetPage">
          {participants.length === 0 ? (
            <div className="OrderPage">
              <h2 className="errorOrderNoEvent">Vous n&apos;avez pas encore créé d&apos;évènement. Veuillez créer un <Link to="/">évènement</Link> afin d&apos;avoir accès à votre liste d&apos;historique</h2>
            </div>
          ) : (
            <div style={{ height: '100%', overflowY: 'auto' }}>
              <Order />
            </div>
          )}
        

          <div className="poolBudgetPage">
            <Pool />
          </div>
        </div>
      }
    </div>
  )
}