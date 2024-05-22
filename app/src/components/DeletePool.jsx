import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

import { useNavigate } from "react-router-dom";

export default function DeletePool() {

  const navigate = useNavigate();

  const handleDelete = () => {
    localStorage.removeItem('formData');
    localStorage.removeItem('totalAmount');
    navigate('/');
  }

  return (
    <div>
      <button  onClick={handleDelete} >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  )
}