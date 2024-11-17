import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders log in link", () => {
  render(<App />)
  const linkElement = screen.getAllByText(/log in/i)
  expect(linkElement[0]).toBeInTheDocument()
})
