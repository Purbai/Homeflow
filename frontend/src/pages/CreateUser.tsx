import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../api/backendClient"
import { SendEmail } from "../Components/Mailer/SendEmail"

export function CreateUser(): JSX.Element {
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [aboutme, setAboutMe] = useState("")
  const [error, setError] = useState<{ [key: string]: string[] }>({})

  const navigate = useNavigate()

  function tryRegister(event: FormEvent) {
    event.preventDefault()
    registerUser(firstname, lastname, email, username, password, aboutme)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            setError(errorData.errors)
            throw new Error()
          })
        } else {
          if (email !== "") {
            const message = "Welcome to Whales Spotting. You have successfully signed-up"
            const returnMsg = SendEmail({ username, message, userEmail: email })
            if (returnMsg !== "success") {
              setError({ emailSignup: [returnMsg] })
              throw new Error(returnMsg)
            }
          }

          return response.json()
        }
      })
      .then((data) => {
        navigate("/")
      })
      .catch((error) => {})
  }

  let errorLines: string[] = []

  for (const item of Object.values(error)) {
    errorLines = errorLines.concat(item)
  }

  const errorList = errorLines.map((errorLine) => <p style={{ color: "red" }}>{errorLine}</p>)

  return (
    <div className="sign-up-page">
      <h1 className="title py-4">Sign up</h1>
      <div className="container col-lg-10 col-sm-6 pt-3 mx-auto justify-content-center">
        <form className="createUser-form justify-content-center" onSubmit={tryRegister}>
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="firstName" className="col-lg-3 col-sm-2 col-form-label">
              First Name
            </label>
            <div className="col-lg-6 col-sm-3">
              <input
                id="firstName"
                className="form-control"
                type={"text"}
                value={firstname}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="lastName" className="col-lg-3 col-sm-2 col-form-label">
              Last Name
            </label>
            <div className="col-lg-6 col-sm-3">
              <input
                id="lastName"
                className="form-control"
                type={"text"}
                value={lastname}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="email" className="col-lg-3 col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-lg-6 col-sm-3">
              <input
                id="email"
                className="form-control"
                type={"text"}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="username" className="col-lg-3 col-sm-2 col-form-label">
              Username
            </label>
            <div className="col-lg-6 col-sm-3">
              <input
                id="username"
                className="form-control"
                type={"text"}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>

          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="password" className="col-lg-3 col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-lg-6 col-sm-3">
              <input
                id="password"
                className="form-control"
                type={"password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="aboutMe" className="col-lg-3 col-sm-2 col-form-label">
              About Me
            </label>
            <div className="col-lg-6 col-sm-3">
              <textarea
                id="aboutMe"
                className="form-control"
                value={aboutme}
                onChange={(event) => setAboutMe(event.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="form-group row justify-content-center">
            <div className="col-lg-4 col-sm-10 justify-content-center ps-5">
              <button className="btn btn-outline-success px-4" style={{ width: "200px" }} onClick={tryRegister}>
                Sign up
              </button>
            </div>
          </div>
          {error && errorList}
        </form>
      </div>
    </div>
  )
}
