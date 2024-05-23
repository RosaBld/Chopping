// Libraries
import { faBeerMugEmpty, faMoneyBill1, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from "react"


export default function NumberDrinks() {
  const [drinks, setDrinks] = useState([]);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const storedDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
    setDrinks(storedDrinks);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
      const newCost = storedDrinks.reduce((total, drink) => {
        const price = typeof drink.price === 'string' ? Number(drink.price.replace(',', '.')) : drink.price;
        return total + (price * drink.quantity);
      }, 0);
      if (newCost !== cost) {
        setCost(newCost);
        setDrinks(storedDrinks);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [cost]);

  const totalDrink = drinks.reduce((total, drink) => {
    const quantity = typeof drink.quantity === 'string' ? Number(drink.quantity.replace(',', '.')) : drink.quantity;
    return total + quantity;
  }, 0);

  const data = JSON.parse(localStorage.getItem('participants')) || {};
  const totalAmount = data.totalAmount;

  return(
    <div>
      <FontAwesomeIcon icon={faBeerMugEmpty} />
      <p>{totalDrink}</p>
      <FontAwesomeIcon icon={faMoneyBill1} />
      <p>{cost}</p>
      {cost > totalAmount && 
      <Tooltip title="Le montant total de votre commande est supérieure au total de votre cagnotte!">
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </Tooltip>
      }
    </div>
  ) 
}