// Libraries
import { faCheck, faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import Loading from "./Loading";
export default function AddAllMoney() {
  const data = JSON.parse(localStorage.getItem('participants'));

  const [isLoading, setIsLoading] = useState(true);
  const [participants, setParticipants] = useState([{ name: '', people: 1, amount: 0 }]);
  const setShowCustom2 = useState(data?.participants.map(() => false));
  const [showModal3, setShowModal3] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState(data?.participants.map(() => ({ type: null, value: null })));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const storedData = localStorage.getItem('participants');
      if (storedData) {
        const data = JSON.parse(storedData);
        setParticipants(data.participants);
        setSelectedButtons(data.participants.map(() => ({ type: null, value: null })));
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
    setShowModal3(false);
  };

  const toggleModal3 = () => {
    setShowModal3(!showModal3);
  }

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

  const updateAmountAll = (e, amountToAdd) => {
    e.preventDefault();
    const newParticipants = participants.map(participant => {
      return {...participant, amount: participant.amount + amountToAdd};
    });
    setParticipants(newParticipants);
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
            <FontAwesomeIcon icon={faXmark} onClick={toggleModal3} />
          </button>
        </div>
        <div>
          <h2 className="explainAddAmount">Quel montant souhaitez-vous ajouter à tous les participants?</h2>
          <div className="buttonsAddByFive">
            <button className="addTo" onClick={(e) => updateAmountAll(e, 5)}>5€</button>
            <button className="addTo" onClick={(e) => updateAmountAll(e, 10)}>10€</button>
            <button className="addTo" onClick={(e) => updateAmountAll(e, 15)}>15€</button>
            <button className="addTo" onClick={(e) => updateAmountAll(e, 20)}>20€</button>
            <button className="addTo" onClick={handleShow2}><FontAwesomeIcon icon={faPen} /></button>
          </div>
        </div>
        <div className="validateParticipant">
          <button className="participantButtonsValidate" type="submit" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faCheck} /> Valider
          </button>
        </div>
      </ReactModal>
    </div>
  )
}