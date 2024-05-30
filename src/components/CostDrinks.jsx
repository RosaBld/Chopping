// Libraries
import { faMoneyBill1, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from "react"


export default function CostDrinks() {
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
      const newCost = storedDrinks.reduce((total, drink) => {
        const price = typeof drink.price === 'string' ? Number(drink.price.replace(',', '.')) : drink.price;
        return total + (price * drink.quantity);
      }, 0);
      if (newCost !== cost) {
        setCost(newCost);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [cost]);

  const data = JSON.parse(localStorage.getItem('participants')) || {};
  const totalAmount = data.totalAmount;

  return(
    <div className="drinksPrice">
      <FontAwesomeIcon icon={faMoneyBill1} />
      <p>{cost}</p>
      {cost > totalAmount && 
      <Tooltip title="Le montant total de votre commande est supérieur au total de votre cagnotte!">
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </Tooltip>
      }
    </div>
  ) 
}