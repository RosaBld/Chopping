// Libraries
import { faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import ReactModal from 'react-modal';

export default function AddAllMoney({ participants, setParticipants }) {
  const [showModal3, setShowModal3] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem('participants');
      if (storedData) {
        const data = JSON.parse(storedData);
        setParticipants(data.participants);
      }
    };

    fetchData();
  }, [setParticipants]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const newParticipants = participants.map(participant => {
      return {...participant, amount: participant.amount + selectedAmount};
    });
    setParticipants(newParticipants);
    const totalAmount = newParticipants.reduce((total, person) => total + person.people * person.amount, 0);
    const originalData = JSON.parse(localStorage.getItem('participants'));
    const time = originalData.time;
    const expireTime = originalData.expireTime;
    
    localStorage.setItem('participants', JSON.stringify({ 
      participants: newParticipants, 
      totalAmount, 
      time,
      expireTime, 
    }));
    setSelectedAmount(0); // Reset the selected amount
    setShowModal3(false);
  };

  const toggleModal3 = () => {
    setShowModal3(!showModal3);
  }

  const updateAmountAll = (e, amountToAdd) => {
    e.preventDefault();
    setSelectedAmount(amountToAdd); // Update the selected amount
  };

  return (
    <div>
      <button onClick={toggleModal3} className="addAmountParticipants">
        <FontAwesomeIcon icon={faPlus} /> Ajouter € à tous
      </button>

      <ReactModal 
        isOpen={showModal3}
        onRequestClose={toggleModal3}
        contentLabel="Participant Form"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(2px)',
          },
          content: {
            color: 'lightsteelblue',
            width: '70%',
            height: '50%',
            margin: 'auto',
            marginLeft: '-20px',
            padding: '20px',
            border: '10px solid rgba(233, 233, 233, 1)',
            borderRadius: '25px',
            position: 'absolute',
            top: '0',
            marginTop: '22vw'
          },
        }}
      >
        <div className="modalContent">
          <button className="closeModal">
            <FontAwesomeIcon icon={faXmark} onClick={toggleModal3} className="fa" />
          </button>
        </div>
        <div>
          <h2 className="explainAddAmount">Quel montant souhaitez-vous ajouter à tous les participants?</h2>
          <div className="buttonsAddByFive">
            <button className="addTo" onClick={(e) => updateAmountAll(e, 5)}>5€</button>
            <button className="addTo" onClick={(e) => updateAmountAll(e, 10)}>10€</button>
            <button className="addTo" onClick={(e) => updateAmountAll(e, 15)}>15€</button>
            <button className="addTo" onClick={(e) => updateAmountAll(e, 20)}>20€</button>
          </div>
        </div>
        <div className="validateParticipant">
          <button className="participantButtonsValidate" type="submit" onClick={handleSubmit}>
            Valider <FontAwesomeIcon icon={faCheck} /> 
          </button>
        </div>
      </ReactModal>
    </div>
  )
}


AddAllMoney.propTypes = {
  participants: PropTypes.array.isRequired,
  setParticipants:  PropTypes.func.isRequired
};