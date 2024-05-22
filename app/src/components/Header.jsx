import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export default function Header() {


  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/participants">
              List
            </Link>
          </li>
          <li>
            <Link to="/budget">
              Budget
            </Link>
          </li>
          <li>
            <Link to="/drinks">
              Boissons
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <Link to="/configuration">
              <FontAwesomeIcon icon={faGear} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}