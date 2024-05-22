import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export default function TotalParticipants() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || {};
    const storedPeople = storedData.formData || [];
    setFormData(storedPeople);
  }, []);

  const totalPeople = formData.reduce((total, formData) => {
    const people = typeof formData.people === 'string' ? Number(formData.people.replace(',', '.')) : formData.people;
    return total + people;
  }, 0);

  return(
    <div>
      <FontAwesomeIcon icon={faUsers} />
      <p>{totalPeople}</p>
    </div>
  ) 
}