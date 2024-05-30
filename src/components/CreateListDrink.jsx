// Libraries
import { faPlus, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import ReactModal from 'react-modal';


export default function CreateListDrink() {

  const [listDrink, setListDrink] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('listDrink');
    if (data) {
      setListDrink(JSON.parse(data));
    }
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newDrink = {
      name: event.target.name.value
    };
    const currentDrinks = [...listDrink, newDrink];
    localStorage.setItem('listDrink', JSON.stringify(currentDrinks));
    setListDrink(currentDrinks);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      <div className="listConfig">
        <h2>Votre liste de boissons personnalisée</h2>
        {listDrink.map((drink, index) => (
          <div key={index}>
            <h3>{drink.name}</h3>
          </div>
        ))}
      </div>

      <div className="createDrinkable">
        <button onClick={toggleModal} className="createDrink">
          <FontAwesomeIcon icon={faPlus} />
        </button>

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
              height: '25%',
              margin: 'auto',
              padding: '20px',
              border: '1px solid black',
            },
          }}
        >
          <button className="closeModal">
            <FontAwesomeIcon icon={faXmark} onClick={toggleModal} />
          </button>
          <div className="formDrinks">
            <form onSubmit={handleFormSubmit}>
              <div className="labelDrinks">
                <label>Boisson:</label>
                <input name="name" required />
              </div>

              <div className="validate">
                <button className="validateDrink" type="submit">
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </form>
          </div>
        </ReactModal>
      </div>
    </div>
  )
}