// Libraries
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
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
    localStorage.setItem('participants', JSON.stringify({  participants, totalAmount }));
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
        <button onClick={() => navigate('/drinks')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      <div>
      {listParticipants.length === 0 ? (
        <div>
          <h2>Aucun participant à votre cagnotte n'a été trouvé. Veuillez créer une <Link to="/">cagnotte</Link> ou ajouter des participants à votre cagnotte déjà existante</h2>
        </div>
      ) : (
        <div>
          {listParticipants.map((participant, index) => {
            const totalAmount = participant.people * participant.amount;
            return (
              <div key={index}>
                <h3>{participant.name}</h3>
                <p>{participant.people}</p>
                <p>{totalAmount}</p>
              </div>
            );
          })}
        </div>
      )}
      </div>
      
      <div>
        {listParticipants.length > 0 && (
          <button onClick={toggleModal}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
          {showModal && (
            <form onSubmit={handleSubmit}>
            {participants.map((person, index) => (
              <div key={index}>
                <label>Name:</label>
                <input value={person.name} onChange={e => {
                  const newParticipants = [...participants];
                  newParticipants[index].name = e.target.value;
                  setParticipants(newParticipants);
                }} required />
      
                <label>Number of people:</label>
                <input type="number" min="1" value={person.people} onChange={e => {
                  const newParticipants = [...participants];
                  newParticipants[index].people = Number(e.target.value);
                  setParticipants(newParticipants);
                }} required />
      
                <label>Amount of money:</label>
                <input type="number" min="0" value={person.amount} onChange={e => {
                  const newParticipants = [...participants];
                  newParticipants[index].amount = Number(e.target.value);
                  setParticipants(newParticipants);
                }} required />
              </div>
            ))}
          <button type="button" onClick={addPerson}>
            <FontAwesomeIcon icon={faPlus} /> Add Person
          </button>
    
          <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}