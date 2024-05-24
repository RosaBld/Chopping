// Libraries
import { faCheck, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import ReactModal from 'react-modal'
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';


export default function DeletePool({ onPoolDelete }) {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    localStorage.removeItem('participants');
    localStorage.removeItem('drinks');
    localStorage.removeItem('totalAmount');
    setShowModal(!showModal);
    navigate('/');
    onPoolDelete();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      <button onClick={toggleModal} className="deletePool" >
        <FontAwesomeIcon icon={faTrashCan} />
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
          <p className="deleteConfirmation">Etes-vous certain de vouloir supprimer la cagnotte?</p>
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
  )
}

DeletePool.propTypes = {
  onPoolDelete: PropTypes.func.isRequired,
};