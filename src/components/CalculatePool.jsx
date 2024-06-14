import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ReactModal from 'react-modal';

export default function CalculatePool() {
  const [storedDrinks, setStoredDrinks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  useEffect (() => {
    const drinks = JSON.parse(localStorage.getItem('drinks')) || [];
    setStoredDrinks(drinks);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const drinks = JSON.parse(localStorage.getItem('drinks')) || [];
      if (JSON.stringify(drinks) !== JSON.stringify(storedDrinks)) {
        setStoredDrinks(drinks);
      }
    }, 0);
  
    // Cleanup: clear interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [storedDrinks]);

  const handleCalculate = () => {
    const storedDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
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
  
      // Create order object
      const order = {
        orderNumber: new Date().getTime(),
        drinks: storedDrinks
          .filter(drink => drink.quantity > 0)
          .map(drink => ({ name: drink.name, quantity: drink.quantity, price: drink.price })),
        totalPrice: cost
      };
  
      // Get current orders from localStorage
      const currentOrders = JSON.parse(localStorage.getItem('orders')) || [];
  
      // Add new order to current orders
      currentOrders.push(order);
  
      // Update 'orders' in localStorage
      localStorage.setItem('orders', JSON.stringify(currentOrders));
  
      // Set the quantity of each drink to 0
      const updatedDrinks = storedDrinks.map(drink => ({ ...drink, quantity: 0 }));
      localStorage.setItem('drinks', JSON.stringify(updatedDrinks));
      setStoredDrinks(updatedDrinks);

      // Get the current pool data
      const currentPool = JSON.parse(localStorage.getItem('participants'));

      // Update the participants and totalAmount
      currentPool.participants = participants;
      currentPool.totalAmount = remainingPool.toFixed(2);

      // Set the updated pool data back to localStorage
      localStorage.setItem('participants', JSON.stringify(currentPool));
    }
    setShowModal(false);
  };
  

  return (
    <div className="calculatePool">
      <div>
        <button 
          className={`validate ${storedDrinks.length === 0 || storedDrinks.every(drink => drink.quantity === 0) ? 'disabled' : ''}`} 
          onClick={toggleModal} 
          disabled={storedDrinks.length === 0 || storedDrinks.every(drink => drink.quantity === 0)}
        >
          Valider <FontAwesomeIcon icon={faCheck} />
        </button>

        <ReactModal 
          isOpen={showModal}
          onRequestClose={toggleModal}
          contentLabel="Participant Form"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(2px)',
            },
            content: {
              color: 'lightsteelblue',
              width: '50%',
              height: '35%',
              margin: 'auto',
              padding: '20px',
              border: '10px solid rgba(233, 233, 233, 1)',
              borderRadius: '25px',
              position: 'absolute',
              top: '0',
              marginTop: '40vw'
            },
          }}
        >
          <div className="modalContent">
            <button className="closeModal">
              <FontAwesomeIcon icon={faXmark} onClick={toggleModal} />
            </button>
          </div>
          <div>
            <p className="deleteConfirmation">Voulez-vous passer cette commande?</p>
            <div className="deleteOrNotDelete">
              <button className="cancel">
                <FontAwesomeIcon icon={faXmark} onClick={toggleModal} />
              </button>
              <button onClick={handleCalculate} className="validateDelete">
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
            
          </div>
        </ReactModal>
      </div>
    </div>
  )
}