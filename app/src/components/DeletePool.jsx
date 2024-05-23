// Libraries
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";


export default function DeletePool() {

  const navigate = useNavigate();

  const handleDelete = () => {
    localStorage.removeItem('participants');
    localStorage.removeItem('totalAmount');
    navigate('/');
  }

  return (
    <div>
      <button  onClick={handleDelete} className="deletePool" >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  )
}