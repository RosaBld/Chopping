//Libraries
import { faCheck, faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import ReactModal from 'react-modal';

// Components
import { DeleteDrink, Loading, CalculatePool } from "../utils";


export default function AddDrinks() {

  const [showModal, setShowModal] = useState(false);
  const [participants, setParticipants] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [listDrink, setListDrink] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

    // Simulate a data loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    const intervalId = setInterval(() => {
      const storedDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
      if (storedDrinks.length !== drinks.length) {
        setDrinks(storedDrinks);
      }
      const data = localStorage.getItem('listDrink');
      if (data) {
        setListDrink(JSON.parse(data));
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [drinks]);

  const handleInputChange = (event) => {
    setParticipants({...participants, [event.target.name]: event.target.value });
    setSearchTerm(event.target.value); 
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
          {drinks.map((drink, index) => (
            <div key={index} className="setOfDrink">
              <div className="displayDrink">
                <h2>{drink.name}</h2>
                <p>{drink.price}€</p>
              </div>
              <div className="NumberOfDrinks">
                {drink.quantity === 1 ? (
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
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <CalculatePool />
        </div>
        

        <ReactModal 
          isOpen={showModal}
          onRequestClose={toggleModal}
          contentLabel="Participant Form"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
            content: {
              color: 'lightsteelblue',
              width: '50%',
              height: '30%',
              margin: 'auto',
              padding: '20px',
              border: '10px solid rgba(233, 233, 233, 1)',
              borderRadius: '25px',
              position: 'absolute',
              top: '0',
              marginTop: '50vw'
            },
          }}
        >

          <div className="modalContent">
            <button className="closeModal">
              <FontAwesomeIcon icon={faXmark} onClick={toggleModal} />
            </button>
          </div>
          
          <div className="formDrinks">
            <form onSubmit={handleFormSubmit}>
              <div className="labelDrinks">
                <label>Boisson:</label>
                <input list="drinks" name="name" value={participants.name || ''} onChange={handleInputChange} required />
                <datalist id="drinks">
                  {filteredDrinks.map((drink, index) => (
                    <option key={index} value={drink.name} />
                  ))}
                </datalist>
              </div>
              
              <div className="labelDrinks">
                <label>Montant:</label>
                <input name="price" value={participants.price || ''} onChange={handleInputChange} required />
              </div>
              <div className="validate">
                <button className="validateDrink" type="submit">
                  <FontAwesomeIcon icon={faCheck} className="validateCheck" /> Valider
                </button>
              </div>
            </form>
          </div>
        </ReactModal>
      </div>
    </div>
  )
}