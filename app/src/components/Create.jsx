// Libraries
import { faBeerMugEmpty, faCheck, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useNavigate, useLocation } from 'react-router-dom';
import DeletePool from './DeletePool';


ReactModal.setAppElement('#root');

export default function Create() {
  const [showModal, setShowModal] = useState(false);
  const [participants, setParticipants] = useState([{ name: '', people: 1, amount: 0 }]);
  const navigate = useNavigate();
  const [poolName, setPoolName] = useState('');
  const [existingData, setExistingData] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem('participants');
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData && Array.isArray(parsedData.participants)) {
        setParticipants(parsedData.participants);
        setExistingData(true);
      }
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const totalAmount = participants.reduce((total, person) => {
      const amount = typeof person.amount === 'string' ? Number(person.amount.replace(',', '.')) : person.amount;
      return total + person.people * amount;
    }, 0);
  
    const dataToStore = {
      participants,
      totalAmount,
      poolName,
      time: new Date().getTime()
    };
  
    localStorage.setItem('participants', JSON.stringify(dataToStore));
    setShowModal(false);
    navigate('/Drinks');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const addPerson = () => {
    setParticipants([...participants, { name: '', people: 1, amount: 0 }]);
  };

  const handlePoolDeletion = () => {
    setExistingData(false);
  };

  const backToBeer = () => {
    navigate('/drinks')
  }

  return (
    <div className="createParticipant" key={location.key}>
      {existingData ? (
        <div className='homeErrorMsg'>
          <h2>Vous avez déjà une liste de participants avec une cagnotte. Souhaitez-vous la détruire et recommencer ou souhaitez-vous continuer?</h2>
          <div className='buttons'>
            <DeletePool onPoolDelete={handlePoolDeletion} />
            <button className="backToDrinks" onClick={backToBeer}>
              <FontAwesomeIcon icon={faBeerMugEmpty} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <button className="createBudget" onClick={toggleModal}>
            <FontAwesomeIcon icon={faPlus} />
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
                height: '70%',
                margin: 'auto',
                padding: '20px',
                border: '1px solid black',
              },
            }}
          >
            <button className="closeModal">
              <FontAwesomeIcon icon={faXmark} onClick={toggleModal} />
            </button>

            <form className="formParticipant" onSubmit={handleSubmit}>
              <div className="labelTitle">
                <label>Nom de l&apos;évènement</label>
                <input value={poolName} onChange={e => setPoolName(e.target.value)} required />
              </div>

              {participants.map((person, index) => (
                <div key={index} className="form">
                  <div className="labelPart">
                    <label>Participant:</label>
                    <input value={person.name} onChange={e => {
                      const newParticipants = [...participants];
                      newParticipants[index].name = e.target.value;
                      setParticipants(newParticipants);
                    }} required />
                  </div>
                  <div className="labelPart">
                    <label>Pour:</label>
                    <input type="number" min="1" value={person.people} onChange={e => {
                      const newParticipants = [...participants];
                      newParticipants[index].people = Number(e.target.value);
                      setParticipants(newParticipants);
                    }} required />
                  </div>
                  <div className="labelPart">
                    <label>Montant par personne:</label>
                    <input type="number" min="0" value={person.amount} onChange={e => {
                      const newParticipants = [...participants];
                      newParticipants[index].amount = Number(e.target.value);
                      setParticipants(newParticipants);
                    }} required />
                  </div>
                </div>
              ))}

              <div className="validateParticipant">
                <button className="participantButtons" type="button" onClick={addPerson}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>

                <button className="participantButtons" type="submit">
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </form>
          </ReactModal>
        </>
      )}
    </div>
  );
}