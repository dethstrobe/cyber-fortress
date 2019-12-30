import React from "react"
import App from "./App"
import { render, fireEvent } from "@testing-library/react"

jest.mock("./Board/Board", () => (props: { selectedPlayerAction: string }) => (
  <p>{props.selectedPlayerAction}</p>
))

describe("<App/>", () => {
  it("It should change the selected player action and pass it to the board", () => {
    const { getByDisplayValue, getAllByText } = render(<App />)

    getAllByText("move")

    fireEvent.change(getByDisplayValue("Move"), {
      target: { value: "attack" },
    })

    getAllByText("attack")
  })
})
