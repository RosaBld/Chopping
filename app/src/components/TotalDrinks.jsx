// Libraries
import { faBeerMugEmpty } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"


export default function TotalDrinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const storedDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
    setDrinks(storedDrinks);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
      setDrinks(storedDrinks);
    }, 0);

    return () => {
      clearInterval(intervalId);
    };
  });

  const totalDrink = drinks.reduce((total, drink) => {
    const quantity = typeof drink.quantity === 'string' ? Number(drink.quantity.replace(',', '.')) : drink.quantity;
    return total + quantity;
  }, 0);

  return(
    <div className="drinksAmount">
      <FontAwesomeIcon icon={faBeerMugEmpty} />
      <p>{totalDrink}</p>
    </div>
  ) 
}