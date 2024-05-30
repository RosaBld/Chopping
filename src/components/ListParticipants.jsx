// Libraries
import { faCheck, faEuroSign, faPlus, faUser, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";


export default function ListParticipants() {
  let listParticipants = [];
  const data = JSON.parse(localStorage.getItem('participants'));
  if (data) {
    listParticipants = data.participants;
  }

  const [showModal, setShowModal] = useState(false);
  const [participants, setParticipants] = useState([{ name: '', people: 1, amount: 0 }]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('participants');
    if (storedData) {
      const data = JSON.parse(storedData);
      setParticipants(data.participants);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const totalAmount = participants.reduce((total, person) => total + person.people * person.amount, 0);
    const originalData = JSON.parse(localStorage.getItem('participants'));
    const time = originalData.time;
    localStorage.setItem('participants', JSON.stringify({ participants, totalAmount, time }));
    setShowModal(false);
    navigate('/Drinks');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const addPerson = () => {
    setParticipants([...participants, { name: '', people: 1, amount: 0 }]);
  };

  return (
    <div>

      <div>
      {listParticipants.length === 0 ? (
        <div className="errorList">
          <h2>Aucun participant à votre cagnotte n&apos;a été trouvé. Veuillez créer une <Link to="/">cagnotte</Link> ou ajouter des participants à votre cagnotte déjà existante</h2>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="name"><FontAwesomeIcon icon={faUser} className="icon" /></th>
              <th className="numberUser"><FontAwesomeIcon icon={faUsers} className="icon" /></th>
              <th className="given"><FontAwesomeIcon icon={faEuroSign} className="icon" /></th>
            </tr>
          </thead>
          <tbody>
            {listParticipants.map((participant, index) => {
              const totalAmount = participant.people * participant.amount;
              return (
                <tr key={index}>
                  <td className="name">{participant.name}</td>
                  <td className="numberUser">{participant.people}</td>
                  <td className="given">{totalAmount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      </div>
      
      <div>
        {listParticipants.length > 0 && (
          <div className="createParticipant">
            <button onClick={toggleModal} className="createNewParticipant">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
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
            <form onSubmit={handleSubmit}>
            {participants.map((person, index) => (
              <div key={index} className="formParticipant">
                <div className="labelPart">
                  <label>Name:</label>
                  <input value={person.name} onChange={e => {
                    const newParticipants = [...participants];
                    newParticipants[index].name = e.target.value;
                    setParticipants(newParticipants);
                  }} required />
                </div>

                <div className="labelPart">
                  <label>Number of people:</label>
                  <input type="number" min="1" value={person.people} onChange={e => {
                    const newParticipants = [...participants];
                    newParticipants[index].people = Number(e.target.value);
                    setParticipants(newParticipants);
                  }} required />
                </div>

                <div className="labelPart">  
                  <label>Amount of money:</label>
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
      </div>
    </div>
  );
}