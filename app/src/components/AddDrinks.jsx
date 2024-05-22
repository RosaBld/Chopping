import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function AddDrinks() {

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [drinks, setDrinks] = useState([]);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const currentDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
    const newDrink = {
      ...formData,
      price: Number(formData.price.replace(',', '.')),
      quantity: 1
    };
    currentDrinks.push(newDrink);
    localStorage.setItem('drinks', JSON.stringify(currentDrinks));
    setDrinks(currentDrinks);
    setShowModal(false);
  };

  const incrementQuantity = (index) => {
    const newDrinks = [...drinks];
    newDrinks[index].quantity++;
    setDrinks(newDrinks);
    localStorage.setItem('drinks', JSON.stringify(newDrinks));
  };

  const decrementQuantity = (index) => {
    const newDrinks = [...drinks];
    if (newDrinks[index].quantity > 1) {
      newDrinks[index].quantity--;
    } else {
      newDrinks.splice(index, 1);
    }
    setDrinks(newDrinks);
    localStorage.setItem('drinks', JSON.stringify(newDrinks));
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
      if (storedDrinks.length !== drinks.length) {
        setDrinks(storedDrinks);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [drinks]);

  const handleInputChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div>
        {drinks.map((drink, index) => (
          <div key={index}>
            <h2>{drink.name}</h2>
            <div>
              <FontAwesomeIcon icon={faPlus} onClick={() => incrementQuantity(index)} />
              <p>{drink.quantity}x{drink.price}€</p>
              <FontAwesomeIcon icon={faMinus} onClick={() => decrementQuantity(index)} />
            </div>
          </div>
        ))}
      </div>

      <div>
        <button onClick={toggleModal}>
          <FontAwesomeIcon icon={faPlus} />
        </button>

        {showModal && (
          <div className="">
            <form onSubmit={handleFormSubmit}>
              <label>Boisson:</label>
              <input name="name" value={formData.name || ''} onChange={handleInputChange} required />
              <label>Montant:</label>
              <input name="price" value={formData.price || ''} onChange={handleInputChange} required />

              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>

  )
}