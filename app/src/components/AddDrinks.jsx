//Libraries
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

// Components
import { DeleteDrink } from "../utils";


export default function AddDrinks() {

  const [showModal, setShowModal] = useState(false);
  const [participants, setParticipants] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Add search term state
  const [listDrink, setListDrink] = useState([]); // Add listDrink state

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const currentDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
    const newDrink = {
      ...participants,
      price: Number(participants.price.replace(',', '.')),
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
    }
    setDrinks(newDrinks);
    localStorage.setItem('drinks', JSON.stringify(newDrinks));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
      if (storedDrinks.length !== drinks.length) {
        setDrinks(storedDrinks);
      }
      const data = localStorage.getItem('listDrink'); // Get listDrink from local storage
      if (data) {
        setListDrink(JSON.parse(data)); // Update listDrink state
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [drinks]);

  const handleInputChange = (event) => {
    setParticipants({...participants, [event.target.name]: event.target.value });
    setSearchTerm(event.target.value); // Update search term when input changes
  };

  // Filter drinks based on search term
  const filteredDrinks = listDrink.filter(drink =>
    drink.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <DeleteDrink index={index} drinks={drinks} setDrinks={setDrinks} />
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
              <input list="drinks" name="name" value={participants.name || ''} onChange={handleInputChange} required />
              <datalist id="drinks">
                {filteredDrinks.map((drink, index) => (
                  <option key={index} value={drink.name} />
                ))}
              </datalist>
              <label>Montant:</label>
              <input name="price" value={participants.price || ''} onChange={handleInputChange} required />

              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}