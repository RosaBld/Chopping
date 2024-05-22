import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeerMugEmpty } from "@fortawesome/free-solid-svg-icons";

export default function NumberDrinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const storedDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
    setDrinks(storedDrinks);
  }, []);

  const totalDrink = drinks.reduce((total, drink) => {
    const quantity = typeof drink.quantity === 'string' ? Number(drink.quantity.replace(',', '.')) : drink.quantity;
    return total + quantity;
  }, 0);

  return(
    <div>
      <FontAwesomeIcon icon={faBeerMugEmpty} />
      <p>{totalDrink}</p>
    </div>
  ) 
}