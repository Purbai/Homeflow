import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import Header from "../Header/Header"
import { CreateUser } from "../pages/CreateUser"
import Home from "../pages/Home/Home"
import Explore from "../pages/Explore/Explore"

describe("Header contains all the navigation items", () => {
  test("header has navigation items bar", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    const navigationLinks = screen.getByTestId("navigationLinks")
    expect(navigationLinks).toBeInTheDocument()
  })

  test("header has home link", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    const home = screen.getByText("Home")

    expect(home).toBeInTheDocument()
    expect(home).toHaveAttribute("href", "/")
  })

  test("header has explore link", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    const explore = screen.getByText("Explore")
    expect(explore).toBeInTheDocument()
    expect(explore).toHaveAttribute("href", "/explore")
  })

  test("header has log in button", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    const button = screen.getByTestId("log-in-button")
    expect(button).toBeInTheDocument()
  })

  test("header has sign up button", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    const button = screen.getByTestId("sign-up-button")
    expect(button).toBeInTheDocument()
  })
})

describe("Buttons go to correct pages", () => {
  test("go to log in page when log in button is clicked", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<h1>Log in</h1>} />
          <Route path="/signup" element={<CreateUser />} />
        </Routes>
        <Header />
      </MemoryRouter>,
    )

    const button = screen.getByTestId("log-in-button")
    fireEvent.click(button)
    const logInHeading = await screen.findByRole("heading", { name: /log in/i })
    expect(logInHeading).toBeInTheDocument()
  })

  test("go to sign up page when sign up button is clicked", async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<h1>Log in</h1>} />
          <Route path="/signup" element={<CreateUser />} />
        </Routes>
        <Header />
      </MemoryRouter>,
    )

    const button = screen.getByTestId("sign-up-button")
    fireEvent.click(button)
    const signUpHeading = await screen.findByRole("heading", { name: /sign up/i })
    expect(signUpHeading).toBeInTheDocument()
  })
})
