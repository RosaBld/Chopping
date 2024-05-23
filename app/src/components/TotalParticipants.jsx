// Libraries
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"


export default function TotalParticipants() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('participants')) || {};
    const storedPeople = storedData.participants || [];
    setParticipants(storedPeople);
  }, []);

  const totalPeople = participants.reduce((total, participants) => {
    const people = typeof participants.people === 'string' ? Number(participants.people.replace(',', '.')) : participants.people;
    return total + people;
  }, 0);

  return(
    <div>
      <FontAwesomeIcon icon={faUsers} />
      <p>{totalPeople}</p>
    </div>
  ) 
}