// Libraries
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


export default function BackButton() {

  const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={() => navigate('/drinks')} className="back">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  )
}