// Libraries
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.navbar');

    const toggleNav = () => {
      nav.classList.toggle('show');
      setIsOpen(!isOpen);
    };

    burgerMenu.addEventListener('click', toggleNav);

    return () => {
      burgerMenu.removeEventListener('click', toggleNav);
    };
  }, [isOpen]);

  return (
    <div className="header">
      <div className={`burger-menu ${isOpen ? 'move' : ''}`}>
        <div className="burger"></div>
        <div className="burger"></div>
        <div className="burger"></div>
      </div>

      <nav className="navbar">
        <ul className="links">
          <li className="">
            <Link to="/">
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/participants">
              Participants
            </Link>
          </li>
          <li>
            <Link to="/budget">
              Budget
            </Link>
          </li>
          <li>
            <Link to="/drinks">
              Boissons
            </Link>
          </li>
        </ul>

        <ul className="config">
          <li className="iconConfig">
            <Link to="/configuration">
              <div className="icon-container">
                <FontAwesomeIcon icon={faGear} />
              </div>            
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`overlay ${isOpen ? 'show' : ''}`} />
    </div>
  );
}