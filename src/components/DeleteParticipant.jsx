import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";

export default function DeleteParticipant({ index, participants, setParticipants }) {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteParticipant = () => {
    const newParticipants = [...participants];
    newParticipants.splice(index, 1);
    setParticipants(newParticipants);
    
    const originalData = JSON.parse(localStorage.getItem('participants'));
    const totalAmount = newParticipants.reduce((total, person) => total + person.people * person.amount, 0);
    const time = originalData.time;
    const expireTime = originalData.expireTime;
    
    localStorage.setItem('participants', JSON.stringify({ 
      participants: newParticipants, 
      totalAmount, 
      time,
      expireTime, 
    }));
    
    setShowModal(!showModal);
  }

  return (
    <div className="modifyDelete">
      <button className="deleteParticipant">
        <FontAwesomeIcon icon={faTrashCan} onClick={handleDeleteParticipant} />
      </button>
    </div>
  )
}


DeleteParticipant.propTypes = {
  index: PropTypes.number.isRequired,
  participants: PropTypes.array.isRequired,
  setParticipants: PropTypes.func.isRequired,
};