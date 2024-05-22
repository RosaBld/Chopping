import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.navbar');

    const toggleNav = () => {
      nav.classList.toggle('show');
      setIsOpen(!isOpen); // Toggle isOpen when the burger menu is clicked
    };

    burgerMenu.addEventListener('click', toggleNav);

    return () => {
      burgerMenu.removeEventListener('click', toggleNav);
    };
  }, [isOpen]); // Add isOpen to the dependency array

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
            <Link to="/participants">
              List
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
          <li>
            <Link to="/configuration">
              <FontAwesomeIcon icon={faGear} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}