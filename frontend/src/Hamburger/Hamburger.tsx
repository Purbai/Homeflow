import React, { useState } from "react"
import "./Hamburger.scss" // styling for the hmauburger button icon

import Menu from "../Menu/Menu"

const Hamburger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div data-testid="show-hamburger" className="show-hamburger">
      <button onClick={handleClick} className="hamburger" data-testid="toggle-button">
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </button>

      {isOpen ? (
        <div className="menu menu-open" data-testid="menu">
          <Menu />
        </div>
      ) : (
        <div className="menu menu-hidden" data-testid="menu">
          <Menu />
        </div>
      )}
    </div>
  )
}

export default Hamburger
