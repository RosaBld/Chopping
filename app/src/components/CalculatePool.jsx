import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function CalculatePool() {
  const [storedDrinks, setStoredDrinks] = useState([]);

  useEffect (() => {
    const drinks = JSON.parse(localStorage.getItem('drinks')) || [];
    setStoredDrinks(drinks);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const drinks = JSON.parse(localStorage.getItem('drinks')) || [];
      if (drinks.length !== storedDrinks.length) {
        setStoredDrinks(drinks);
      }
    }, 0);

    return () => {
      clearInterval(intervalId);
    };
  }, [storedDrinks]);

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
      setStoredDrinks([]);
    }
  }

  return (
    <div className="calculatePool">
      {storedDrinks.length === 0 ? (
        <>
        </>
      ) : (
        <button className="validate" onClick={handleCalculate}>
          <FontAwesomeIcon icon={faCheck} /> Valider la commande
        </button>
      )}
    </div>
  )
}