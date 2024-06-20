// Libraries
import { faBeerMugEmpty, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import DeletePool from './DeletePool';

export default function Create() {
  const navigate = useNavigate();
  const [existingData, setExistingData] = useState(false);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('participants');
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData && Array.isArray(parsedData.participants)) {
        setExistingData(true);
      }
    }
  }, []);
  

  const handlePoolDeletion = () => {
    setExistingData(false);
  };

  const backToBeer = () => {
    navigate('/drinks')
  }

  const toggleDeleteModal = () => {
    setShowModal(!showModal);
  }


  return (
    <div>
      {existingData ? (
        <div className='homeErrorMsg'>
          <h2>Vous avez déjà une liste de participants avec une cagnotte. Souhaitez-vous la détruire et recommencer ou souhaitez-vous continuer?</h2>
          <div className='buttons'>
            <DeletePool onPoolDelete={handlePoolDeletion} isHomePage={true} page="/" toggleDeleteModal={toggleDeleteModal}/>
            <button className="backToDrinks" onClick={backToBeer}>
              <FontAwesomeIcon icon={faBeerMugEmpty} className="drinkIcon" />
            </button>
          </div>
        </div>
      ) : (
        <>
        <div className="logoHome">
          <img src="/chopping-full.svg" alt="logo Chopp'ing et marque" className="ChoppinLogo" />
          <h3 className="accroche">« Les bons comptes font les bonnes guinzes ! »</h3>
        </div>
        <div className="createParticipant" key={location.key}></div>
        <Link to='/createEvent'>
            <button className="createBudget">
                <FontAwesomeIcon icon={faPlus} /> Ajouter
            </button>
          </Link>
        </>
      )}
    </div>
  );
}