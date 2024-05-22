import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useState } from "react";

export default function DeleteDrink({ index, drinks, setDrinks }) {

  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    const newDrinks = [...drinks];
    newDrinks.splice(index, 1);
    setDrinks(newDrinks);
    localStorage.setItem('drinks', JSON.stringify(newDrinks));

  };

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      <button>
        <FontAwesomeIcon icon={faTrashCan} onClick={toggleModal} />
      </button>

      {showModal && (
        <div>
          <p>Etes-vous certain de vouloir supprimer cette boisson de votre liste?</p>
          <button>
            <FontAwesomeIcon icon={faXmark} onClick={toggleModal} />
          </button>
          <button onClick={handleDelete}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      )}

    </div>
  );
}

DeleteDrink.propTypes = {
  index: PropTypes.number.isRequired,
  drinks: PropTypes.array.isRequired,
  setDrinks: PropTypes.func.isRequired,
};