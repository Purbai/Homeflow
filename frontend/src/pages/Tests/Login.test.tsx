import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import Login from "../Login/Login"
import { MemoryRouter } from "react-router-dom"
import { loginUser } from "../../api/backendClient"

test("renders Log In button", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  )
  const button = screen.getByRole("button", { name: "Log in" })
  expect(button).toBeInTheDocument()
})

jest.mock("../../api/backendClient", () => ({
  loginUser: jest.fn(),
}))

test("username and password parameters are passed into loginUser method", async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  )

  const mockLoginUser = loginUser as jest.Mock
  mockLoginUser.mockResolvedValue({ ok: true })

  const usernameInput = screen.getByLabelText(/username/i, { exact: false }) as HTMLInputElement
  fireEvent.change(usernameInput, { target: { value: "testuser" } })

  const passwordInput = screen.getByLabelText(/password/i, { exact: false }) as HTMLInputElement
  fireEvent.change(passwordInput, { target: { value: "Testpass1)" } })

  fireEvent.click(screen.getByRole("button", { name: "Log in" }))

  expect(mockLoginUser).toHaveBeenCalledWith("testuser", "Testpass1)")
})
