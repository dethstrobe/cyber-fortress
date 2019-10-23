import React from "react"
import { Board } from "./board"
import { render, fireEvent, waitForElement } from "@testing-library/react"

describe("<Board/>", () => {
  it("should dispatch the move action", () => {
    const location = { x: 0, y: 0 }
    const moveActionMock = jest.fn()
    const { getByTestId } = render(
      <Board location={location} moveAction={moveActionMock} />,
    )

    fireEvent.click(getByTestId("game-board"))
    expect(moveActionMock).toHaveBeenCalledWith({ x: 0, y: 0 })
  })
})
