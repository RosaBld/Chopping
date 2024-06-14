// Libraries
import { faPlus, faCheck, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import ReactModal from 'react-modal';


export default function CreateListDrink() {

  const [listDrink, setListDrink] = useState([]);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);


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
    setShowModal2(!showModal2);
  };

  const toggleModal1 = () => {
    setShowModal1(!showModal1);
  }

  const toggleModal2 = () => {
    setShowModal2(!showModal2);
  }

  const deleteDrink = (index) => {
    const newDrinks = [...listDrink];
    newDrinks.splice(index, 1);
    setListDrink(newDrinks);
    localStorage.setItem('listDrink', JSON.stringify(newDrinks));
    setShowModal1(!showModal1);
  };

  return (
    <div>
      <div className="listConfig">
        <h2>Votre liste de boissons personnalisée</h2>
        {listDrink.map((drink, index) => (
          <div key={index} className="listDrinkConfig">
            <h3>{drink.name}</h3>
            <button className="deleteDrink" onClick={toggleModal1}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <ReactModal 
              isOpen={showModal1}
              onRequestClose={toggleModal1}
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
                  marginTop: '50vw'
                },
              }}
            >
              <div>
                <p className="deleteConfirmation">Etes-vous certain de vouloir supprimer cette boisson de votre liste?</p>
                <div className="deleteOrNotDelete">
                  <button className="cancel">
                    <FontAwesomeIcon icon={faXmark} onClick={toggleModal1} />
                  </button>
                  <button onClick={() => deleteDrink(index)} className="validateDelete">
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </div>
                
              </div>
            </ReactModal>
          </div>
        ))}
      </div>

      <div className="createDrinkable">
        <button onClick={toggleModal2} className="createDrink">
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <ReactModal 
          isOpen={showModal2}
          onRequestClose={toggleModal2}
          contentLabel="Participant Form"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(2px)',
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
              <FontAwesomeIcon icon={faXmark} onClick={toggleModal2} className="fa" />
            </button>
          </div>
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