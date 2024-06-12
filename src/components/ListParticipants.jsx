// Libraries
import { faCheck, faEuroSign, faMinus, faPen, faPlus, faUser, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import { Link } from "react-router-dom";


export default function ListParticipants() {
  let listParticipants = [];
  const data = JSON.parse(localStorage.getItem('participants'));
  if (data) {
    listParticipants = data.participants;
  }

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [participants, setParticipants] = useState([{ name: '', people: 1, amount: 0 }]);
  const [newParticipant, setNewParticipant] = useState({ name: '', people: 1, amount: 0 });
  const [showCustom, setShowCustom] = useState(false);
  const [showCustom2, setShowCustom2] = useState(false);
  

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
    const expireTime = originalData.expireTime;
    const poolName= originalData.poolName;
    
    localStorage.setItem('participants', JSON.stringify({ 
      participants, 
      totalAmount, 
      time,
      expireTime, 
      poolName
    }));
    setShowModal2(false);
    setShowModal3(false);
  };

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
    const poolName = originalData.poolName; 
    localStorage.setItem('participants', JSON.stringify({ 
      participants: updatedParticipants, 
      totalAmount, 
      time,
      expireTime, 
      poolName
    }));
  };
  
  const toggleModal1 = () => {
    setShowModal1(!showModal1);
  };

  const toggleModal2 = () => {
    setShowModal2(!showModal2);
  }

  const toggleModal3 = () => {
    setShowModal3(!showModal3);
  }

  const updateAmount = (e, index, amountToAdd) => {
    e.preventDefault();
    const newParticipants = [...participants];
    newParticipants[index].amount += amountToAdd;
    setParticipants(newParticipants);
  };
  
  const updateNewParticipantAmount = (e, amountToAdd) => {
    e.preventDefault();
    setNewParticipant(prev => ({...prev, amount: amountToAdd}));
  };
  
  const handleShow = (e) => {
    e.preventDefault();
    setShowCustom(prevShow => !prevShow);
  };

  const handleShow2 = (e) => {
    e.preventDefault();
    setShowCustom2(prevShow2 => !prevShow2);
  };

  const updateAmountAll = (e, amountToAdd) => {
    e.preventDefault();
    const newParticipants = participants.map(participant => {
      return {...participant, amount: participant.amount + amountToAdd};
    });
    setParticipants(newParticipants);
  };

  // const addPerson = () => {
  //   setParticipants([...participants, { name: '', people: 1, amount: 0 }]);
  // };


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
          <div>
            <div className="createParticipant">
              <button onClick={toggleModal2} className="modifyNewParticipant">
                <FontAwesomeIcon icon={faPen} /> Modifier
              </button>
              <button onClick={toggleModal1} className="addNewParticipant">
                <FontAwesomeIcon icon={faPlus} /> Ajouter
              </button>
            </div>
            <div>
              <button onClick={toggleModal3} className="addAmountParticipants">
                <FontAwesomeIcon icon={faPlus} /> Ajouter € à tous
              </button>
            </div>
          </div>
        )}

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
                  <div className="buttonsAddByFive">
                    <button className="addTo" onClick={(e) => updateNewParticipantAmount(e, 5)}>5€</button>
                    <button className="addTo" onClick={(e) => updateNewParticipantAmount(e, 10)}>10€</button>
                    <button className="addTo" onClick={(e) => updateNewParticipantAmount(e, 15)}>15€</button>
                    <button className="addTo" onClick={(e) => updateNewParticipantAmount(e, 20)}>20€</button>
                    <button className="addTo" onClick={handleShow}><FontAwesomeIcon icon={faPen} /></button>
                  </div>
                  <div className="number" style={{display: showCustom ? '' : 'none'}}>
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
            <div className="validateParticipant">
              {/* <button className="participantButtons" type="button" onClick={addPerson}>
                <FontAwesomeIcon className="plus" icon={faPlus} />
              </button> */}

              <button className="participantButtonsValidate" onClick={addNewParticipant} >
                <FontAwesomeIcon icon={faCheck} /> Valider
              </button>
            </div>
          </form>
        </ReactModal>

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
                    <button className="addTo" onClick={(e) => updateAmount(e, index, 5)}>5€</button>
                    <button className="addTo" onClick={(e) => updateAmount(e, index, 10)}>10€</button>
                    <button className="addTo" onClick={(e) => updateAmount(e, index, 15)}>15€</button>
                    <button className="addTo" onClick={(e) => updateAmount(e, index, 20)}>20€</button>
                    <button className="addTo" onClick={handleShow2}><FontAwesomeIcon icon={faPen} /></button>
                  </div>
                  <div className="number" style={{display: showCustom2 ? '' : 'none'}}>
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
                <FontAwesomeIcon icon={faCheck} /> Valider
              </button>
            </div>
          </form>
        </ReactModal>

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
    </div>
  );
}