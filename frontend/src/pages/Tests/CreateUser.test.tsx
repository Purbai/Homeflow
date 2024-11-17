import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { CreateUser } from "../CreateUser"
import { MemoryRouter } from "react-router-dom"
import { registerUser } from "../../api/backendClient"

test("renders Sign up button", () => {
  render(
    <MemoryRouter>
      <CreateUser />
    </MemoryRouter>,
  )
  const button = screen.getByRole("button", { name: "Sign up" })
  expect(button).toBeInTheDocument()
})

test("renders form fields", () => {
  render(
    <MemoryRouter>
      <CreateUser />
    </MemoryRouter>,
  )
  const firstname = screen.getByText("First Name")
  const lastname = screen.getByText("Last Name")
  const email = screen.getByText("Email")
  const username = screen.getByText("Username")
  const password = screen.getByText("Password")
  const aboutMe = screen.getByText("About Me")
  expect(firstname).toBeInTheDocument()
  expect(lastname).toBeInTheDocument()
  expect(email).toBeInTheDocument()
  expect(username).toBeInTheDocument()
  expect(password).toBeInTheDocument()
  expect(aboutMe).toBeInTheDocument()
})

test("change of state of first name", () => {
  render(
    <MemoryRouter>
      <CreateUser />
    </MemoryRouter>,
  )
  const firstNameInput = screen.getByLabelText(/first name/i, { exact: false }) as HTMLInputElement
  fireEvent.change(firstNameInput, { target: { value: "Evie" } })
  expect(firstNameInput.value).toBe("Evie")
})

test("change of state of last name", () => {
  render(
    <MemoryRouter>
      <CreateUser />
    </MemoryRouter>,
  )
  const lastNameInput = screen.getByLabelText(/last name/i, { exact: false }) as HTMLInputElement
  fireEvent.change(lastNameInput, { target: { value: "Brown" } })
  expect(lastNameInput.value).toBe("Brown")
})

test("change of state of email", () => {
  render(
    <MemoryRouter>
      <CreateUser />
    </MemoryRouter>,
  )
  const emailInput = screen.getByLabelText(/email/i, { exact: false }) as HTMLInputElement
  fireEvent.change(emailInput, { target: { value: "user1@email.com" } })
  expect(emailInput.value).toBe("user1@email.com")
})

test("change of state of username", () => {
  render(
    <MemoryRouter>
      <CreateUser />
    </MemoryRouter>,
  )
  const usernameInput = screen.getByLabelText(/username/i, { exact: false }) as HTMLInputElement
  fireEvent.change(usernameInput, { target: { value: "evie1" } })
  expect(usernameInput.value).toBe("evie1")
})

test("change of state of password", () => {
  render(
    <MemoryRouter>
      <CreateUser />
    </MemoryRouter>,
  )
  const passwordInput = screen.getByLabelText(/password/i, { exact: false }) as HTMLInputElement
  fireEvent.change(passwordInput, { target: { value: "hahehohoha" } })
  expect(passwordInput.value).toBe("hahehohoha")
})

test("change of state of about me", () => {
  render(
    <MemoryRouter>
      <CreateUser />
    </MemoryRouter>,
  )
  const aboutMeInput = screen.getByLabelText(/about me/i, { exact: false }) as HTMLInputElement
  fireEvent.change(aboutMeInput, { target: { value: "Hello from Evie" } })
  expect(aboutMeInput.value).toBe("Hello from Evie")
})

jest.mock("../../api/backendClient", () => ({
  registerUser: jest.fn(),
}))

test("mandatory parameters are passed into registerUser method", async () => {
  render(
    <MemoryRouter>
      <CreateUser />
    </MemoryRouter>,
  )

  const mockRegisterUser = registerUser as jest.Mock
  mockRegisterUser.mockResolvedValue({ ok: true })

  const usernameInput = screen.getByLabelText(/username/i, { exact: false }) as HTMLInputElement
  fireEvent.change(usernameInput, { target: { value: "testing" } })

  const passwordInput = screen.getByLabelText(/password/i, { exact: false }) as HTMLInputElement
  fireEvent.change(passwordInput, { target: { value: "Testpass1)" } })

  const emailInput = screen.getByLabelText(/email/i, { exact: false }) as HTMLInputElement
  fireEvent.change(emailInput, { target: { value: "user1@email.com" } })

  fireEvent.click(screen.getByRole("button", { name: "Sign up" }))

  expect(mockRegisterUser).toHaveBeenCalledWith("", "", "user1@email.com", "testing", "Testpass1)", "")
})
