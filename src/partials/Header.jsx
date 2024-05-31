// Libraries
import { faGear, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ReactModal from 'react-modal';
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div className="header">

      {location.pathname !== '/' && 
        <img src="src/assets/img/Chopping-logo.svg" alt="logo Chopp'ing" className="ChoppinLogo" />
      }

      <div className="burger-menu" onClick={toggleModal}>
        <div className="burger"></div>
        <div className="burger"></div>
        <div className="burger"></div>
      </div>

      <ReactModal 
        isOpen={showModal}
        onRequestClose={toggleModal}
        contentLabel="Navbar Header"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(2px)',
            margin: '0',
          },
          content: {
            color: 'lightsteelblue',
            width: '80%', 
            height: '55%',
            padding: '20px',
            border: 'none',
            borderRadius: '25px',
            top: '0',
            left: '2.1%', 
            position: 'absolute',
            margin: '10px'
          },
        }}
      >

        
        <nav className="navbar">

          <img src="src/assets/img/Chopping-logo.svg" alt="logo Chopp'ing" className="ChoppinLogoNav" />

          <ul className="links">
            <li className="">
              <Link to="/" onClick={toggleModal}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/participants" onClick={toggleModal}>
                Participants
              </Link>
            </li>
            <li>
              <Link to="/budget" onClick={toggleModal}>
                Budget
              </Link>
            </li>
            <li>
              <Link to="/drinks" onClick={toggleModal}>
                Boissons
              </Link>
            </li>
          </ul>

          <ul className="config">
            <li className="iconConfig">
              <button className="icon-container" onClick={toggleModal}>
                <FontAwesomeIcon icon={faClose} className="closeModalHeader" />
              </button>            
            </li>
            
            <li className="iconConfig">
              <button onClick={() => { navigate('/configuration'); toggleModal(); }} className="icon-container">
                <FontAwesomeIcon icon={faGear} className="config-icon" />
              </button>            
            </li>

            
          </ul>
        </nav>
      </ReactModal>

    </div>
  );
}