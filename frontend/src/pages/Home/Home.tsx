import "./Home.scss"
import { Link } from "react-router-dom"

const Home: React.FC = () => {
   const logo = require("./../../images/homeflow.png")

  return (
    <>
      <div data-testid="background-container" className="background-container">
         <div className="logo">
           <img src={logo} alt="HomeFlow logo" width="200" />
        </div> 
        <div className="top-buttons">
          <Link to="/addpatient">
            <button id="submit-button" data-testid="submit-button" className="btn btn-primary btn-lg custom-button">
              Submit
            </button>
          </Link>
          <Link to="/explore">
            <button id="explore-button" data-testid="explore-button" className="btn btn-primary btn-lg custom-button">
              Explore
            </button>
          </Link>
        </div>
      </div>
      <div className="description">
        <p>
          Welcome to HomeFlow — your one-stop platform for tracking patient care requirements!
        </p>
        <p className="long-para">
          some text goes here ....
        </p>
        <p>more text</p>
      </div>
    </>
  )
}

export default Home
