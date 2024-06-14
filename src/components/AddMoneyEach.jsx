import { faCheck, faMinus, faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactModal from 'react-modal';

import { DeleteParticipant } from "../utils";

export default function AddMoneyEach() {
  const data = JSON.parse(localStorage.getItem('participants'));

  const [showCustom2, setShowCustom2] = useState(data?.participants.map(() => false) || []);
  const [showModal2, setShowModal2] = useState(false);
  const [participants, setParticipants] = useState(data?.participants || [{ name: '', people: 1, amount: 0 }]);
  const [selectedButtons, setSelectedButtons] = useState(data?.participants.map(() => ({ type: null, value: null })) || []);

  const toggleModal2 = () => {
    setShowModal2(!showModal2);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedData = localStorage.getItem('participants');
      if (storedData) {
        const data = JSON.parse(storedData);
        setParticipants(data.participants);
      }
    }, 10);

    return () => { 
      clearInterval(intervalId);
    };
  }, []);

  const handleShow2 = (e, index) => {
    e.preventDefault();
    setShowCustom2(prevShow => {
      const newShow = [...prevShow];
      newShow[index] = !newShow[index];
      return newShow;
    });
    const newSelectedButtons = [...selectedButtons];
    newSelectedButtons[index] = { type: 'custom', value: null };
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
    setShowModal2(false);
  };

  const updateAmount = (e, index, amountToAdd) => {
    e.preventDefault();
    const newParticipants = [...participants];
    newParticipants[index].amount += amountToAdd;
    setParticipants(newParticipants);

    const newSelectedButtons = [...selectedButtons];
    newSelectedButtons[index] = { type: 'amount', value: amountToAdd };
    setSelectedButtons(newSelectedButtons);
  };

  return (
    <div>
      <button onClick={toggleModal2} className="modifyNewParticipant">
        <FontAwesomeIcon icon={faPen} /> Modifier
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
            <FontAwesomeIcon icon={faXmark} onClick={toggleModal2} />
          </button>
        </div>
        <form className="formNewPart" onSubmit={handleSubmit}>
        {participants.map((person, index) => (
          <div key={index} className="formParticipant">

            <DeleteParticipant 
              index={index} 
              participants={participants} 
              setParticipants={setParticipants} 
            />

            <div className="labelPart">
              <label>Name:</label>
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
                  onClick={(e) => handleShow2(e, index)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
              <div className="number" style={{display: showCustom2[index] ? '' : 'none'}}>
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