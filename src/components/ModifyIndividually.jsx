import { faCheck, faMinus, faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import ReactModal from 'react-modal';

export default function ModifyIndividually({ participantIndex }) {
  const data = JSON.parse(localStorage.getItem('participants'));

  const [showModal, setShowModal] = useState(false);
  const [showCustom, setShowCustom] = useState(data?.participants.map(() => false) || []);
  const [selectedButtons, setSelectedButtons] = useState(data?.participants.map(() => ({ type: null, value: null })) || []);
  const [participants, setParticipants] = useState(data?.participants || [{ name: '', people: 1, amount: 0 }]);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const handleButtonClick = (index) => {
    setActiveIndex(index);
    toggleModal();
  }

  useEffect(() => {
    const storedData = localStorage.getItem('participants');
    if (storedData) {
      const data = JSON.parse(storedData);
      setParticipants(data.participants);
    }
  }, [participantIndex]);

  const handleShow = (e, index) => {
    e.preventDefault();
    setShowCustom(prevShow => {
      const newShow = [...prevShow];
      newShow[index] = !newShow[index];
      return newShow;
    });
    const newSelectedButtons = [...selectedButtons];
    newSelectedButtons[index] = { type: 'custom', value: null };
    setSelectedButtons(newSelectedButtons);
  };

  const updateAmount = (e, participantIndex, amountToAdd) => {
    e.preventDefault();
    const newParticipants = [...participants];
    newParticipants[participantIndex].amount = amountToAdd;
    setParticipants(newParticipants);

    const newSelectedButtons = [...selectedButtons];
    newSelectedButtons[participantIndex] = { type: 'amount', value: amountToAdd };
    setSelectedButtons(newSelectedButtons);
};

  const handleSubmit = (event) => {
    event.preventDefault();
    const totalAmount = participants.reduce((total, person) => total + person.people * person.amount, 0);
    const originalData = JSON.parse(localStorage.getItem('participants'));
    const time = originalData.time;
    const expireTime = originalData.expireTime;
    
    localStorage.setItem('participants', JSON.stringify({ 
      participants, 
      totalAmount, 
      time,
      expireTime, 
    }));
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={() => handleButtonClick(participantIndex) & toggleModal()} className="modifyIndividualParticipant">
        <FontAwesomeIcon icon={faPen} />
      </button>

      <ReactModal 
        isOpen={showModal && activeIndex !== null}
        onRequestClose={toggleModal}
        contentLabel="Participant Form"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(2px)',
          },
          content: {
            color: 'lightsteelblue',
            width: '75%',
            height: '65%',
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
            <FontAwesomeIcon icon={faXmark} onClick={toggleModal} className="fa" />
          </button>
        </div>
        <form className="formNewPart" onSubmit={handleSubmit}>
        {participants.map((person, index) => (
          index === activeIndex && (
            <div key={index} className="formParticipant">
              <div className="labelPart">
                <label>Name:{index}</label>
                <input value={person.name} onChange={e => {
                  const newParticipants = [...participants];
                  newParticipants[index].name = e.target.value;
                  setParticipants(newParticipants);
                }} required />
              </div>

              <div className="labelPartNumber">
                <label>Nombre de personne:</label>
                <div className="number">
                  <input type="number" min="1" value={person.people} className='inputNumber' onChange={e => {
                    const newParticipants = [...participants];
                    newParticipants[index].people = Number(e.target.value);
                    setParticipants(newParticipants);
                  }} required />
                  <button className="lessParticipants" onClick={e => {
                    e.preventDefault();
                    const newParticipants = [...participants];
                    newParticipants[index].people = Math.max(Number(newParticipants[index].people) - 1, 0);
                    setParticipants(newParticipants);
                  }}>
                    <FontAwesomeIcon className="minus" icon={faMinus} />
                  </button>
                  <button className="moreParticipants"onClick={e => {
                    e.preventDefault();
                    const newParticipants = [...participants];
                    newParticipants[index].people = Number(newParticipants[index].people) + 1;
                    setParticipants(newParticipants);
                  }}>
                    <FontAwesomeIcon className="plus" icon={faPlus} />
                  </button>
                </div>
              </div>

              <div className="labelPartNumber">
                <label>Montant par personne:</label>
                <div className="buttonsAddByFive">
                  <button 
                    className={`addTo ${selectedButtons[index]?.type === 'amount' && selectedButtons[index]?.value === 5 ? 'selected' : ''}`} 
                    onClick={(e) => updateAmount(e, index, 5)}
                  >
                    5€
                  </button>
                  <button 
                    className={`addTo ${selectedButtons[index]?.type === 'amount' && selectedButtons[index]?.value === 10 ? 'selected' : ''}`} 
                    onClick={(e) => updateAmount(e, index, 10)}
                  >
                    10€
                  </button>
                  <button 
                    className={`addTo ${selectedButtons[index]?.type === 'amount' && selectedButtons[index]?.value === 15 ? 'selected' : ''}`} 
                    onClick={(e) => updateAmount(e, index, 15)}
                  >
                    15€
                  </button>
                  <button 
                    className={`addTo ${selectedButtons[index]?.type === 'amount' && selectedButtons[index]?.value === 20 ? 'selected' : ''}`} 
                    onClick={(e) => updateAmount(e, index, 20)}
                  >
                    20€
                  </button>
                  <button 
                    className={`addTo ${selectedButtons[index]?.type === 'custom' ? 'selected' : ''}`} 
                    onClick={(e) => handleShow(e, index)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </div>
                <div className="number" style={{display: showCustom[index] ? '' : 'none'}}>
                  <input type="number" min="0" value={person.amount} className='inputNumber' onChange={e => {
                    const newParticipants = [...participants];
                    newParticipants[index].amount = Number(e.target.value);
                    setParticipants(newParticipants);
                  }} required />
                  <button className="lessMoney" onClick={e => {
                    e.preventDefault();
                    const newParticipants = [...participants];
                    newParticipants[index].amount = Math.max(Number(newParticipants[index].amount) - 1, 0);
                    setParticipants(newParticipants);
                  }}>
                    <FontAwesomeIcon className="minus" icon={faMinus} />
                  </button>
                  <button className="moreMoney" onClick={e => {
                    e.preventDefault();
                    const newParticipants = [...participants];
                    newParticipants[index].amount = Number(newParticipants[index].amount) + 1;
                    setParticipants(newParticipants);
                  }}>
                    <FontAwesomeIcon className="plus" icon={faPlus} />
                  </button>
                </div>
              </div>
            </div>
          )
        ))}

        <div className="validateParticipant">
          <button className="participantButtonsValidate" type="submit" >
            Valider <FontAwesomeIcon icon={faCheck} /> 
          </button>
        </div>
      </form>
      </ReactModal>
    </div>
  )
}

ModifyIndividually.propTypes = {
  participantIndex: PropTypes.number.isRequired,
};