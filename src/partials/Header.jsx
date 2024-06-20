// Libraries
import { useEffect, useState } from "react";
import ReactModal from 'react-modal';
import { Link, useLocation } from "react-router-dom";
import { DeletePool } from "../utils";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const setExistingData = useState(true)[1];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
    setIsActive(!isActive);
  };

  const toggleDeleteModal = () => {
    setShowModal2(!showModal2);
  }

  const handlePoolDeletion = () => {
    setExistingData(false);
  };

  return (
    <div className="header">

      {location.pathname !== '/' && 
      <div className="logoAndTitle">
        <img src="/Chopping-logo.svg" alt="logo Chopp'ing" className="ChoppinLogo" /> 
        <h1 className="title">Chopping</h1>
      </div>
      }

      <div className={`burger-menu ${isActive ? 'open' : ''}`} onClick={toggleModal}>
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
            width: windowWidth > 425 ? '85.7vw' : windowWidth > 320 ? '83.7vw' : '81vw', 
            height: '70%',
            padding: '20px',
            border: 'none',
            borderRadius: '25px',
            top: '0',
            left: '0', 
            position: 'absolute',
            margin: '10px'
          },
        }}
      >
        <nav className="navbar">

          <img src="/Chopping-logo.svg" alt="logo Chopp'ing" className="ChoppinLogoNav" />

          <ul className="links">
            <li>
              <Link to="/drinks" onClick={toggleModal}>
                Commande
              </Link>
            </li>
            <li>
              <Link to="/participants" onClick={toggleModal}>
                Participants
              </Link>
            </li>
            <li>
              <Link to="/budget" onClick={toggleModal}>
                Historique
              </Link>
            </li>
            <li>
              <Link to="/configuration" onClick={toggleModal}>
                Boisson(s) personnalisée(s)
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleModal}>
                A propos
              </Link>
            </li>
          </ul>

          <ul className="config">
            <li className="iconConfig">
              <DeletePool onPoolDelete={handlePoolDeletion} toggleDeleteModal={toggleDeleteModal} page="/header" />            
            </li>
          </ul>
        </nav>

      </ReactModal>

    </div>
  );
}