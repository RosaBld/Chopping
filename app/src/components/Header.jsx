// Libraries
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <div className="header">
      <div className={`burger-menu ${isOpen ? 'move' : ''}`} onClick={toggleNav}>
        <div className="burger"></div>
        <div className="burger"></div>
        <div className="burger"></div>
      </div>

      <nav className={`navbar ${isOpen ? 'show' : ''}`}>
        <ul className="links">
          <li className="">
            <Link to="/" onClick={closeNav}>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/participants" onClick={closeNav}>
              Participants
            </Link>
          </li>
          <li>
            <Link to="/budget" onClick={closeNav}>
              Budget
            </Link>
          </li>
          <li>
            <Link to="/drinks" onClick={closeNav}>
              Boissons
            </Link>
          </li>
        </ul>

        <ul className="config">
          <li className="iconConfig">
            <Link to="/configuration" onClick={closeNav}>
              <div className="icon-container">
                <FontAwesomeIcon icon={faGear} />
              </div>            
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={closeNav} />
    </div>
  );
}