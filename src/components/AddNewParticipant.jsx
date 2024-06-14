// Libraries
import { faCheck, faMinus, faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactModal from 'react-modal';


export default function AddNewParticipant() {
  const data = JSON.parse(localStorage.getItem('participants')) || { participants: [{ name: '', people: 1, amount: 0 }] };

  const [participants, setParticipants] = useState(data.participants);
  const [showModal1, setShowModal1] = useState(false);
  const [newParticipant, setNewParticipant] = useState({ name: '', people: 1, amount: 0 });
  const [showCustom, setShowCustom] = useState(participants.map(() => false));
  const [selectedButtons, setSelectedButtons] = useState(participants.map(() => ({ type: null, value: null })));
  
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

  // Function to handle changes in the form
  const handleInputChange = (event, field) => {
    setNewParticipant({
      ...newParticipant,
      [field]: event.target.value,
    });
  };

  const addNewParticipant = (event) => {
    event.preventDefault();
    const updatedParticipants = [...participants, newParticipant];
    setParticipants(updatedParticipants);
    setNewParticipant({ name: '', people: 1, amount: 0 });
    setShowModal1(false);
  
    const originalData = JSON.parse(localStorage.getItem('participants'));
    const totalAmount = updatedParticipants.reduce((total, person) => total + person.people * person.amount, 0);
    const time = originalData.time;
    const expireTime = originalData.expireTime;
    localStorage.setItem('participants', JSON.stringify({ 
      participants: updatedParticipants, 
      totalAmount, 
      time,
      expireTime, 
    }));
  };
  
  const toggleModal1 = () => {
    setShowModal1(!showModal1);
  };
  
  const updateNewParticipantAmount = (e, index, amountToAdd) => {
    e.preventDefault();
    setNewParticipant(prev => ({...prev, amount: amountToAdd}));
    setSelectedButtons(prev => {
      const newSelectedButtons = [...prev];
      newSelectedButtons[index] = { type: 'amount', value: amountToAdd };
      return newSelectedButtons;
    });
  };
  
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

  return (
    <div>
      <button onClick={toggleModal1} className="addNewParticipant">
        <FontAwesomeIcon icon={faPlus} /> Ajouter
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
            width: '75%',
            height: '67%',
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
            <FontAwesomeIcon icon={faXmark} onClick={toggleModal1} />
          </button>
        </div>

        <form className="formNewPart" onSubmit={addNewParticipant}>
          <div className="formParticipant">
            <div className="labelPart">
              <label>Name:</label>
              <input value={newParticipant.name} onChange={e => handleInputChange(e, 'name')} required />
            </div>

            <div className="labelPartNumber">
              <label>Nombre de personne:</label>
              <div className="number">
                <input type="number" min="1" value={newParticipant.people} className='inputNumber' onChange={e => handleInputChange(e, 'people')} required />
                <button className="lessParticipants" onClick={e => {
                  e.preventDefault();
                  setNewParticipant(prev => ({...prev, people: Math.max(Number(prev.people) - 1, 0)}));
                }}>
                  <FontAwesomeIcon className="minus" icon={faMinus} />
                </button>
                <button className="moreParticipants"onClick={e => {
                  e.preventDefault();
                  setNewParticipant(prev => ({...prev, people: Number(prev.people) + 1}));
                }}>
                  <FontAwesomeIcon className="plus" icon={faPlus} />
                </button>
              </div>
            </div>

            <div className="labelPartNumber">
            <label>Montant par personne:</label>
            <div>
              <div className="buttonsAddByFive">
                <button 
                  className={`addTo ${selectedButtons[0]?.type === 'amount' && selectedButtons[0]?.value === 5 ? 'selected' : ''}`} 
                  onClick={(e) => updateNewParticipantAmount(e, 0, 5)}
                >
                  5€
                </button>

                <button 
                  className={`addTo ${selectedButtons[0]?.type === 'amount' && selectedButtons[0]?.value === 10 ? 'selected' : ''}`} 
                  onClick={(e) => updateNewParticipantAmount(e, 0, 10)}
                >
                  10€
                </button>

                <button 
                  className={`addTo ${selectedButtons[0]?.type === 'amount' && selectedButtons[0]?.value === 15 ? 'selected' : ''}`} 
                  onClick={(e) => updateNewParticipantAmount(e, 0, 15)}
                >
                  15€
                </button>

                <button 
                  className={`addTo ${selectedButtons[0]?.type === 'amount' && selectedButtons[0]?.value === 20 ? 'selected' : ''}`} 
                  onClick={(e) => updateNewParticipantAmount(e, 0, 20)}
                >
                  20€
                </button>

                <button 
                  className={`addTo ${selectedButtons[0]?.type === 'amount' && selectedButtons[0]?.value === null ? 'selected' : ''}`} 
                  onClick={(e) => handleShow(e, 0)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
              <div className="number" style={{display: showCustom[0] ? '' : 'none'}}>
                <input type="number" min="0" value={newParticipant.amount} className='amount' onChange={e => handleInputChange(e, 'amount')} required />
                <button className="lessMoney" onClick={e => {
                  e.preventDefault();
                  setNewParticipant(prev => ({...prev, amount: Math.max(Number(prev.amount) - 1, 0)}));
                }}>
                  <FontAwesomeIcon className="minus" icon={faMinus} />
                </button>
                <button className="moreMoney" onClick={e => {
                  e.preventDefault();
                  setNewParticipant(prev => ({...prev, amount: Number(prev.amount) + 1}));
                }}>
                  <FontAwesomeIcon className="plus" icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
          </div>
          <div className="validateParticipant">
            <button className="participantButtonsValidate" onClick={addNewParticipant} >
              Valider <FontAwesomeIcon icon={faCheck} /> 
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  )
}