import React from "react"
import "./Menu.scss"
import NavigationLinks from "../NavigationLinks/NavigationLinks"

const Menu: React.FC = () => {
  return (
    <div>
      <h1>Menu</h1>
      <nav>
        <NavigationLinks />
      </nav>
    </div>
  )
}

export default Menu
