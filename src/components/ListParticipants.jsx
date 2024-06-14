// Libraries
import { faEuroSign, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

//Components
import { AddAllMoney, AddNewParticipant, ModifyIndividually, ModifyParticipants } from "../utils";

export default function ListParticipants() {
  const data = JSON.parse(localStorage.getItem('participants')) || { participants: [] };
  const [participants, setParticipants] = useState(data.participants || []);

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
                  <td className="modify"><ModifyIndividually participantIndex={index} /></td>
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
              <ModifyParticipants participants={participants} setParticipants={setParticipants} />
              <AddNewParticipant participants={participants} setParticipants={setParticipants} />
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