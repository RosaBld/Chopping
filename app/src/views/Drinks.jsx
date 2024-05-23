// Components
import { AddDrinks, CalculatePool, NumberDrinks, Pool, TotalParticipants } from '../utils';


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