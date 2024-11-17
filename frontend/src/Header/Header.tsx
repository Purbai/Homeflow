import "./Header.scss"
import "../App.scss"
import NavigationLinks from "../NavigationLinks/NavigationLinks"
import { Link } from "react-router-dom"

const Header: React.FC = () => {
  const logo = require("../images/homeflow.png")

  return (
    <div className="show-header">
      <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Whale Whale Whale logo" width="200" />
          </Link>
          <NavigationLinks />
        </div>
      </nav>
    </div>
  )
}

export default Header
