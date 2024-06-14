// Libraries
import { faEuroSign, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Components
import { AddMoneyEach, AddAllMoney, AddNewParticipant } from "../utils";
import ModifyIndividually from "./ModifyIndividually";


export default function ListParticipants() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedData = localStorage.getItem('participants');
      if (storedData) {
        const data = JSON.parse(storedData);
        setParticipants(data.participants);
      }
    }, 10);

    return () => { 
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <div>
      {participants.length === 0 ? (
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
              <th className="modify"></th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => {
              const totalAmount = participant.people * participant.amount;
              return (
                <tr key={index}>
                  <td className="name">{participant.name}</td>
                  <td className="numberUser">{participant.people}</td>
                  <td className="given">{totalAmount}</td>
                  <td className="modify"><ModifyIndividually participant={participant} participantIndex={index} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      </div>
      
      <div>
        {participants.length > 0 && (
          <div>
            <div className="createParticipant">
              <AddMoneyEach />
              <AddNewParticipant />
            </div>
            <div>
              <AddAllMoney />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}