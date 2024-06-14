//Libraries
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";

// Components
import { AddAllMoney, ModifyParticipants } from "../utils";

export default function ErrorNotEnoughMoney({ totalCost }) {

  const [participants, setParticipants] = useState([]);
  const [isCostGreaterThanTotal, setIsCostGreaterThanTotal] = useState(false);

  useEffect(() => {
    let intervalId = null;

    const checkStorage = () => {
      const data = JSON.parse(localStorage.getItem('participants')) || {};
      setIsCostGreaterThanTotal(totalCost > data.totalAmount);
    };

    intervalId = setInterval(checkStorage, 100);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [totalCost]);

  return (
    <div>
      {isCostGreaterThanTotal && 
        <div className="errorDiv">
          <FontAwesomeIcon icon={faTriangleExclamation} />
          Le montant total de votre commande est supérieur au total de votre cagnotte!
          <div className="errorAddMoney">
            <AddAllMoney />
            <ModifyParticipants participants={participants} setParticipants={setParticipants} />
          </div>
        </div>
      }
    </div>
  )
}

ErrorNotEnoughMoney.propTypes = {
  totalCost: PropTypes.number.isRequired,
};