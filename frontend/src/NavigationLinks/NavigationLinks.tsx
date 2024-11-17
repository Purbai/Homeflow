import { useNavigate, Link } from "react-router-dom"
import { LoginContext } from "../Components/LoginManager/LoginManager"
import { useContext } from "react"

const NavigationLinks: React.FC = () => {
  const { roleType } = useContext(LoginContext)
  const { isLoggedIn } = useContext(LoginContext)
  const { logOut, saveJwtToContext, saveRoleTypeToContext } = useContext(LoginContext)
  const navigate = useNavigate()

  const handleClick = (event: { currentTarget: { id: string } }) => {
    const buttonId = event.currentTarget.id
    switch (buttonId) {
      case "log-in-button":
        navigate("/login")
        break
      case "sign-up-button":
        navigate("/signup")
        break
      case "log-out-button":
        logOut()
        saveRoleTypeToContext("")
        saveJwtToContext("")
        navigate("/")
        break
      default:
        break
    }
  }

  return (
    <ul className="navbar-nav mb-2 mb-lg-0 d-flex w-100 justify-content-around" data-testid="navigationLinks">
      <li className="nav-item">
        <Link to="/" className="nav-link" data-testid="homeLink">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/explore" className="nav-link">
          Explore
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/addpatient" className="nav-link">
          Add Patient Details
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/patientlist" className="nav-link">
          update/delete Patient Details
        </Link>
      </li>

      {isLoggedIn && (
        <div>
          <button
            id="log-out-button"
            data-testid="log-out-button"
            className="btn btn-outline-success px-2"
            style={{ width: "100px", margin: "5px" }}
            onClick={handleClick}
          >
            Log Out
          </button>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <button
            id="log-in-button"
            data-testid="log-in-button"
            className="btn btn-outline-success px-2"
            style={{ width: "100px", margin: "5px" }}
            onClick={handleClick}
          >
            Log In
          </button>
          <button
            id="sign-up-button"
            data-testid="sign-up-button"
            className="btn btn-outline-success px-2"
            style={{ width: "100px", margin: "5px" }}
            onClick={handleClick}
          >
            Sign Up
          </button>
        </div>
      )}
    </ul>
  )
}

export default NavigationLinks
