import { Order, Pool } from "../utils";


export default function Budget() {

  return (
    <div className="budgetPage">
      <Order />

      <div className="poolBudgetPage">
        <Pool />
      </div>
    </div>
  )
}