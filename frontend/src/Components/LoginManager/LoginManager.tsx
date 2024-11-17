import React, { createContext, ReactNode, useState } from "react"

export const LoginContext = createContext({
  isLoggedIn: false,
  roleType: "",
  logIn: () => {},
  logOut: () => {},
  username: "",
  password: "",
  jwt: "",
  saveUsernameToContext: (username: string) => {},
  savePasswordToContext: (password: string) => {},
  saveJwtToContext: (jwt: string) => {},
  saveRoleTypeToContext: (roleType: string) => {},
})

interface LoginManagerProps {
  children: ReactNode
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
  const [loggedIn, setLoggedIn] = useState(false)
  const [contextUsername, setContextUsername] = useState("")
  const [contextPassword, setContextPassword] = useState("")
  const [contextJwt, setContextJwt] = useState("")
  const [roleType, setRoleType] = useState("")

  function logIn() {
    setLoggedIn(true)
  }

  function logOut() {
    setLoggedIn(false)
  }

  function saveUsernameToContext(username: string) {
    setContextUsername(username)
  }

  function savePasswordToContext(password: string) {
    setContextPassword(password)
  }

  function saveJwtToContext(jwt: string) {
    setContextJwt(jwt)
  }

  function saveRoleTypeToContext(roleType: string) {
    setRoleType(roleType)
  }

  const context = {
    isLoggedIn: loggedIn,
    roleType: roleType,
    logIn,
    logOut,
    username: contextUsername,
    password: contextPassword,
    jwt: contextJwt,
    saveUsernameToContext,
    savePasswordToContext,
    saveJwtToContext,
    saveRoleTypeToContext,
  }

  return <LoginContext.Provider value={context}>{props.children}</LoginContext.Provider>
}
