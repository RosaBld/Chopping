import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ListParticipants() {
  const data = JSON.parse(localStorage.getItem('formData'));
  const participants = data.formData;

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState([{ name: '', people: 1, amount: 0 }]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setFormData(data.formData);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const totalAmount = formData.reduce((total, person) => total + person.people * person.amount, 0);
    localStorage.setItem('formData', JSON.stringify({  formData, totalAmount }));
    setShowModal(false);
    navigate('/Drinks');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const addPerson = () => {
    setFormData([...formData, { name: '', people: 1, amount: 0 }]);
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate('/drinks')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>

      <div>
      {participants.map((participant, index) => {
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
      
      <div>
      <button onClick={toggleModal}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
        {showModal && (
          <form onSubmit={handleSubmit}>
          {formData.map((person, index) => (
            <div key={index}>
              <label>Name:</label>
              <input value={person.name} onChange={e => {
                const newFormData = [...formData];
                newFormData[index].name = e.target.value;
                setFormData(newFormData);
              }} required />
    
              <label>Number of people:</label>
              <input type="number" min="1" value={person.people} onChange={e => {
                const newFormData = [...formData];
                newFormData[index].people = Number(e.target.value);
                setFormData(newFormData);
              }} required />
    
              <label>Amount of money:</label>
              <input type="number" min="0" value={person.amount} onChange={e => {
                const newFormData = [...formData];
                newFormData[index].amount = Number(e.target.value);
                setFormData(newFormData);
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