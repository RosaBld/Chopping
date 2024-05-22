import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import AddDrinks from "../components/AddDrinks";
import CalculatePool from "../components/CalculatePool";
import Pool from "../components/Pool";
import NumberDrinks from "../components/NumberDrinks";
import TotalParticipants from "../components/TotalParticipants";


export default function Drinks() {

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <AddDrinks />
      </div>

      <div>
        <CalculatePool />
      </div>

      <div>
        <Pool />
      </div>

      <div>
        <NumberDrinks />
      </div>

      <div>
        <TotalParticipants />
      </div>

      <div>
        <button onClick={() => navigate('/participants')}>
          Participants 
          <FontAwesomeIcon icon={faUsers} />
        </button>
      </div>
    </div>

  )
}