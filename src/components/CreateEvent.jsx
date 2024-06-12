import { faCheck, faPen, faPlus, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreateEvent() {

  const [participants, setParticipants] = useState([{ name: '', people: 1, amount: 0 }]);
  const navigate = useNavigate();
  const [poolName, setPoolName] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('participants');
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData && Array.isArray(parsedData.participants)) {
        setParticipants(parsedData.participants);
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      expireTime: new Date().getTime()
    };
  
    localStorage.setItem('participants', JSON.stringify(dataToStore));
    navigate('/Drinks');
  };

  const addPerson = () => {
    setParticipants([...participants, { name: '', people: 1, amount: 0 }]);
  };

  const removePerson = () => {
    const newParticipants = [...participants];
    newParticipants.pop();
    setParticipants(newParticipants);
  };

  const backHome = () => {
    navigate('/');
  }

  const updateAmount = (e, index, amountToAdd) => {
    e.preventDefault();
    const newParticipants = [...participants];
    newParticipants[index].amount = amountToAdd;
    setParticipants(newParticipants);
  };

  const handleShow = (e) => {
    e.preventDefault();
    setShowCustom(prevShow => !prevShow);
  };
  

  return (
    <div className="events">
      <div className="createEvent">
        <div className="modalContent">
          <button className="closeModal" onClick={backHome}>
            <FontAwesomeIcon icon={faXmark} className="closeIcon" />
          </button>
        </div>

        <form className="formParticipant" onSubmit={handleSubmit}>
          <div className="labelTitle">
            <label>Nom de l&apos;évènement</label>
            <input value={poolName} onChange={e => setPoolName(e.target.value)} required />
          </div>

          {participants.map((person, index) => (
            <div key={index} className="form">
              {index !== 0 && (
                <button className="deleteParticipant" type="button" onClick={removePerson}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}

              <div className="labelPart">
                <label>Participant:</label>
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
                  <button className="addTo" onClick={(e) => updateAmount(e, index, 5)}>5€</button>
                  <button className="addTo" onClick={(e) => updateAmount(e, index, 10)}>10€</button>
                  <button className="addTo" onClick={(e) => updateAmount(e, index, 15)}>15€</button>
                  <button className="addTo" onClick={(e) => updateAmount(e, index, 20)}>20€</button>
                  <button className="addTo" onClick={handleShow}><FontAwesomeIcon icon={faPen} /></button>
                </div>
                <div className="number" style={{display: showCustom ? '' : 'none'}}>
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
            <button className="participantButtons" type="button" onClick={addPerson}>
              <FontAwesomeIcon icon={faPlus} className="plus" />
            </button>

            <button className="participantButtonValidate" type="submit">
              <FontAwesomeIcon icon={faCheck} className='check' /> Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}