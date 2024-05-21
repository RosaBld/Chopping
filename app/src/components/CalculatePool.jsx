import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function CalculatePool() {
  const handleCalculate = () => {
    const storedDrinks = JSON.parse(localStorage.getItem('drinks')) ||[];
    const cost = storedDrinks.reduce((total, drink) => total + drink.quantity * drink.price, 0);

    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const { price } = JSON.parse(storedData);
      const pool = Number(price);
      const remainingPool = pool - cost;

      localStorage.setItem('formData', JSON.stringify({...JSON.parse(storedData), price: remainingPool}));

      localStorage.removeItem('drinks');
    }
  }

  return (
    <button onClick={handleCalculate}>
      <FontAwesomeIcon icon={faCheck} />
    </button>
  )
}