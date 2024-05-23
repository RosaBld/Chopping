// Components
import { AddDrinks, CalculatePool, CostDrinks, Pool, TotalDrinks, TotalParticipants } from '../utils';


export default function Drinks() {

  return (
    <div>
      <div>
        <AddDrinks />
        <CalculatePool />
      </div>

      <div className="bill">
        <Pool />
        <div className="total">
          <TotalDrinks />
          <CostDrinks />
          <TotalParticipants />
        </div>
      </div>
    </div>

  )
}