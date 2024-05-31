// Libraries
import { faTrashCan, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import ReactModal from 'react-modal'
import PropTypes from "prop-types"

export default function DeleteDrink({ index, drinks, setDrinks }) {

  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    const newDrinks = [...drinks];
    newDrinks.splice(index, 1);
    setDrinks(newDrinks);
    localStorage.setItem('drinks', JSON.stringify(newDrinks));
    setShowModal(!showModal);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      <button className="deleteDrink">
        <FontAwesomeIcon icon={faTrashCan} onClick={toggleModal} />
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
            height: '30%',
            margin: 'auto',
            padding: '20px',
            border: '1px solid black',
          },
        }}
      >
        <div>
          <p className="deleteConfirmation">Etes-vous certain de vouloir supprimer cette boisson de votre liste?</p>
          <div className="deleteOrNotDelete">
            <button className="cancel">
              <FontAwesomeIcon icon={faXmark} onClick={toggleModal} />
            </button>
            <button onClick={handleDelete} className="validateDelete">
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
          
        </div>
      </ReactModal>

    </div>
  );
}

DeleteDrink.propTypes = {
  index: PropTypes.number.isRequired,
  drinks: PropTypes.array.isRequired,
  setDrinks: PropTypes.func.isRequired,
};