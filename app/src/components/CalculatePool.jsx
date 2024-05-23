import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function CalculatePool() {
  const handleCalculate = () => {
    const storedDrinks = JSON.parse(localStorage.getItem('drinks')) ||[];
    const cost = storedDrinks.reduce((total, drink) => total + drink.quantity * drink.price, 0);
  
    const storedData = localStorage.getItem('participants');
    if (storedData) {
      let { participants, totalAmount } = JSON.parse(storedData);
      const pool = Number(totalAmount);
      const remainingPool = pool - cost;
  
      const totalPeople = participants.reduce((total, participant) => total + participant.people, 0);
      const sharedCost = Number((cost / totalPeople).toFixed(2));
  
      participants = participants.map(participant => ({
        ...participant,
        amount: Number(Number(participant.amount.toString().replace(',', '.')).toFixed(2) - sharedCost).toFixed(2)
      }));
  
      localStorage.setItem('participants', JSON.stringify({ participants, totalAmount: remainingPool.toFixed(2) }));
  
      localStorage.removeItem('drinks');
    }
  }

  return (
    <button onClick={handleCalculate}>
      <FontAwesomeIcon icon={faCheck} />
    </button>
  )
}