import AddDrinks from "../components/AddDrinks";
import CalculatePool from "../components/CalculatePool";
import Pool from "../components/Pool";
import NumberDrinks from "../components/NumberDrinks";
import TotalParticipants from "../components/TotalParticipants";


export default function Drinks() {

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
    </div>

  )
}