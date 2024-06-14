// Libraries
import { faCheck, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import ReactModal from 'react-modal'
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';

export default function DeletePool({ onPoolDelete, toggleModal }) {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    localStorage.removeItem('participants');
    localStorage.removeItem('drinks');
    localStorage.removeItem('totalAmount');
    localStorage.removeItem('orders');
    setShowModal(!showModal);
    onPoolDelete();
    navigate('/');
    toggleModal();
  };

  const toggleDeleteModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div>
      <button onClick={toggleDeleteModal} className="deletePool" >
        Supprimer la cagnotte <FontAwesomeIcon icon={faTrashCan} className="trash" /> 
      </button>

      <ReactModal 
        isOpen={showModal}
        onRequestClose={toggleDeleteModal}
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
        <div>
          <p className="deleteConfirmation">Etes-vous certain de vouloir supprimer la cagnotte?</p>
          <div className="deleteOrNotDelete">
            <button className="cancel">
              <FontAwesomeIcon icon={faXmark} onClick={toggleDeleteModal} />
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
  isHomePage: PropTypes.bool,
  toggleModal: PropTypes.func.isRequired, // Add this line
};