import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Create() {
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState([{ name: '', people: 1, amount: 0 }]);
  const navigate = useNavigate();
  const [poolName, setPoolName] = useState('');


  useEffect(() => {
    const data = localStorage.getItem('formData');
    if (data) {
      setFormData(JSON.parse(data));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const totalAmount = formData.reduce((total, person) => total + person.people * person.amount, 0);
    localStorage.setItem('formData', JSON.stringify({  formData, totalAmount, poolName }));
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
      <button onClick={toggleModal}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {showModal && (
        <form onSubmit={handleSubmit}>
          <label>Pool Name:</label>
          <input value={poolName} onChange={e => setPoolName(e.target.value)} required />

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
  )
}