// Libraries
import { useState, useEffect } from 'react';

// Components
import { AddDrinks, CalculatePool, CostDrinks, Loading, Pool, TotalDrinks, TotalParticipants } from '../utils';


export default function Drinks() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a data loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 2 seconds delay
  }, []);

  return (
    <div>
      {isLoading ? 
        <div className="homepage">
          <Loading />
        </div> 
      : 
        <div>
          <div>
            <AddDrinks />
            <CalculatePool />
          </div>

          <div className="bill">
            <Pool />
            <div className="total">
              <TotalDrinks />
              <CostDrinks />
              <TotalParticipants />
            </div>
          </div>
        </div>
      }
    </div>
  )
}