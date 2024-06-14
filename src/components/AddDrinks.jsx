//Libraries
import { faCheck, faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import ReactModal from 'react-modal';

// Components
import { DeleteDrink, ErrorNotEnoughMoney, Loading } from "../utils";

export default function AddDrinks() {

  const [showModal, setShowModal] = useState(false);
  const [participants, setParticipants] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [listDrink, setListDrink] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [price, setPrice] = useState(""); 
  const [quantity, setQuantity] = useState(1);
  const [totalCost, setTotalCost] = useState(0); // Add this line

  useEffect(() => {
    const newTotalCost = drinks.reduce((acc, drink) => acc + (drink.price * drink.quantity), 0);
    setTotalCost(newTotalCost);
  }, [drinks]);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const currentDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
    const newDrink = {
      ...participants,
      price: Number(participants.price.replace(',', '.')),
      quantity: quantity
    };
    currentDrinks.push(newDrink);
    localStorage.setItem('drinks', JSON.stringify(currentDrinks));
    setDrinks(currentDrinks);
    setShowModal(false);
  
    // Check if the entered drink name exists in the listDrink array
    if (!listDrink.some(drink => drink.name.toLowerCase() === newDrink.name.toLowerCase())) {
      const newListDrink = [...listDrink, { name: newDrink.name }];
      setListDrink(newListDrink);
  
      // Update the listDrink in local storage
      localStorage.setItem('listDrink', JSON.stringify(newListDrink));
    }
  
    // Reset form fields
    setSearchTerm('');
    setPrice('');
    setQuantity(1);
  };

  const incrementQuantity = (index) => {
    const newDrinks = [...drinks];
    newDrinks[index].quantity++;
    setDrinks(newDrinks);
    localStorage.setItem('drinks', JSON.stringify(newDrinks));
  };

  const decrementQuantity = (index) => {
    const newDrinks = [...drinks];
    if (newDrinks[index].quantity > 0) {
      newDrinks[index].quantity--;
    }
    setDrinks(newDrinks);
    localStorage.setItem('drinks', JSON.stringify(newDrinks));
  };

  useEffect(() => {
    // Simulate a data loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    const intervalId = setInterval(() => {
      const storedDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
      if (JSON.stringify(storedDrinks) !== JSON.stringify(drinks)) {
        setDrinks(storedDrinks);
      }
      const data = localStorage.getItem('listDrink');
      if (data) {
        setListDrink(JSON.parse(data));
      }
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [drinks]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    setParticipants(prevState => ({ ...prevState, [name]: value }));
  
    if (name === 'name') {
      setSearchTerm(value);
      setDropdownVisible(value !== '');
    }
      if (name === 'price') {
      setPrice(value);
    } else if (name === 'quantity') {
      setQuantity(value);
    }
  };

  const filteredDrinks = listDrink.filter(drink =>
    drink.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {isLoading ? 
        <div className="charging">
          <Loading />
        </div>
        :
        <div className="listOfDrinks">
          <ErrorNotEnoughMoney totalCost={totalCost} />
          {drinks.map((drink, index) => (
            <div key={index} className="setOfDrink">
              <div className="displayDrink">
                <h2>{drink.name}</h2>
                <p>{drink.price}€</p>
              </div>
              <div className="NumberOfDrinks">
                {drink.quantity === 0 ? (
                  <DeleteDrink index={index} drinks={drinks} setDrinks={setDrinks} />
                ) : (
                  <button className="lessDrinks">
                    <FontAwesomeIcon className="minus" icon={faMinus} onClick={() => decrementQuantity(index)} />
                  </button>
                )}
                <h2 className="drinkQuantity">{drink.quantity}</h2>
                <button className="moreDrinks">
                  <FontAwesomeIcon className="plus" icon={faPlus} onClick={() => incrementQuantity(index)} />
                </button>
              </div>
            </div>
          ))}
        </div>
      }

      <div className="createDrinkable">
        <div className="addAndCalculate">
          <button onClick={toggleModal} className="createNewDrink">
            <FontAwesomeIcon icon={faPlus} /> Ajouter une boisson
          </button>
        </div>
        

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
              height: '50%',
              margin: 'auto',
              padding: '20px',
              border: '10px solid rgba(233, 233, 233, 1)',
              borderRadius: '25px',
              position: 'absolute',
              top: '0',
              marginTop: '30vw'
            },
          }}
        >

          <div className="modalContent">
            <button className="closeModal">
              <FontAwesomeIcon icon={faXmark} onClick={toggleModal} className="fa" />
            </button>
          </div>
          
          <div className="formDrinks">
            <form onSubmit={handleFormSubmit}>
              <div className="labelDrinks">
                <label>Boisson:</label>
                <input 
                  name="name" 
                  value={searchTerm} 
                  onChange={handleInputChange} 
                  onBlur={() => setTimeout(() => setDropdownVisible(false), 100)} 
                  required 
                />

                  {dropdownVisible && (
                    <select 
                      size={filteredDrinks.length} 
                      className="customDropdown" 
                      onClick={(e) => {
                        e.preventDefault();
                        setSearchTerm(e.target.value);
                      }}
                    >
                      {filteredDrinks.map((drink, index) => (
                        <option key={index} value={drink.name}>
                          {drink.name}
                        </option>
                      ))}
                    </select>
                  )}
                
              </div>
              
              <div className="labelDrinks">
                <label>Prix (unitaire):</label>
                <input type="number" name="price" value={price} onChange={handleInputChange} required className='inputNumber' /> {/* Update this line */}
              </div>

              <div className="labelDrinks">
                <label>Nombre de boissons:</label>
                <input type="number" name="quantity" value={quantity} onChange={handleInputChange} className='inputNumber' ></input>
              </div>

              <div className="validate">
                <button className="validateDrink" type="submit">
                 Valider <FontAwesomeIcon icon={faCheck} className="validateCheck" /> 
                </button>
              </div>
            </form>
          </div>
        </ReactModal>
      </div>
    </div>
  )
}