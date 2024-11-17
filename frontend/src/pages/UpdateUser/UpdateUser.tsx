import { FormEvent, useContext, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { updateUser } from "../../api/backendClient"
import { LoginContext } from "../../Components/LoginManager/LoginManager"
import "./UpdateUser.scss"

export function UpdateUser(): JSX.Element {
  const loginContext = useContext(LoginContext)
  const location = useLocation()
  const userData = location.state

  const [firstname, setFirstName] = useState(userData.firstName)
  const [lastname, setLastName] = useState(userData.lastName)
  const [aboutme, setAboutMe] = useState(userData.aboutMe)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  function tryUpdate(event: FormEvent) {
    event.preventDefault()
    updateUser(loginContext.jwt, firstname, lastname, aboutme)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(JSON.stringify(errorData.errors))
          })
        }
        return response.json()
      })
      .then(() => {
        navigate("/profile")
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <div className="container col-10 col-md-6 pt-4 mx-auto text-center">
      <div className="row">
        <h1 className="title">Update My Details</h1>
      </div>
      <div className="row justify-content-center">
        <form className="form justify-content-center" onSubmit={tryUpdate}>
          <div className="form-group row justify-content-center my-4">
            <label htmlFor="firstName" className="col-sm-2 col-lg-4 col-form-label">
              First Name
            </label>
            <div className="col-sm-3 col-lg-6">
              <input
                id="firstName"
                className="form-control"
                type={"text"}
                value={firstname}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row justify-content-center my-4">
            <label htmlFor="lastName" className="col-sm-2 col-lg-4 col-form-label">
              Last Name
            </label>
            <div className="col-sm-3 col-lg-6">
              <input
                id="lastName"
                className="form-control"
                type={"text"}
                value={lastname}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>

          <div className="form-group row justify-content-center my-4">
            <label htmlFor="aboutMe" className="col-sm-2 col-lg-4 col-form-label">
              About Me
            </label>
            <div className="col-sm-3 col-lg-6">
              <textarea
                id="aboutMe"
                className="form-control"
                value={aboutme}
                onChange={(event) => setAboutMe(event.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="form-group row justify-content-center">
            <div className="col-sm-10 my-3">
              <button className="btn btn-outline-success px-4" style={{ width: "200px" }} onClick={tryUpdate}>
                Update
              </button>
            </div>
          </div>
          {error && <p style={{ color: "red" }}> {error}</p>}
        </form>
      </div>
    </div>
  )
}
