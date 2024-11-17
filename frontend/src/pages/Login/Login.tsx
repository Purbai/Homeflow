import "./Login.scss"
import { FormEvent, useState, useContext } from "react"
import { LoginContext } from "../../Components/LoginManager/LoginManager"
import { loginUser } from "../../api/backendClient"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { logIn, saveUsernameToContext, savePasswordToContext, saveJwtToContext, saveRoleTypeToContext } =
    useContext(LoginContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function tryLogin(event: FormEvent) {
    event.preventDefault()
    loginUser(username, password)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Incorrect username and/or password.")
        }
        return response.json()
      })
      .then((data) => {
        saveJwtToContext(data.token)
        saveUsernameToContext(username)
        savePasswordToContext(password)
        saveRoleTypeToContext(data.roleType)
        logIn()
        navigate("/")
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <div>
      <h1 className="title py-4">Log in</h1>
      <div className="container col-lg-10 col-sm-6 pt-3 mx-auto justify-content-center">
        <form className="login-form justify-content-center" onSubmit={tryLogin}>
          {error && <p style={{ color: "red" }}>{error}</p>}
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

          <div className="form-group row justify-content-center">
            <div className="col-lg-4 col-sm-10 justify-content-center mx-auto ps-5">
              <button
                className="btn btn-outline-success px-4 justify-content-center"
                style={{ width: "200px" }}
                type="submit"
              >
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
