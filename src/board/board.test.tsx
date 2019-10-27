import React from "react"
import { Board } from "./board"
import { render, fireEvent, waitForElement } from "@testing-library/react"

describe("<Board/>", () => {
  describe("click event", () => {
    const setup = (location = { x: 3, y: 3 }) => {
      const moveActionsMock = {
        up: jest.fn(),
        down: jest.fn(),
        left: jest.fn(),
        right: jest.fn(),
      }
      const board = render(<Board location={location} {...moveActionsMock} />)
      return {
        ...board,
        moveActionsMock,
      }
    }

    describe("click event", () => {
      it("should dispatch the move up action", () => {
        const { getByTestId, moveActionsMock } = setup()
        fireEvent.click(getByTestId("game-board"), {
          clientX: 500,
          clientY: 500,
        })
        expect(moveActionsMock.up).toHaveBeenCalled()
        expect(moveActionsMock.down).not.toHaveBeenCalled()
      })

      it("should dispatch the move down action", () => {
        const { getByTestId, moveActionsMock } = setup()
        fireEvent.click(getByTestId("game-board"), { clientX: 100 })
        expect(moveActionsMock.up).not.toHaveBeenCalled()
        expect(moveActionsMock.down).toHaveBeenCalled()
      })
    })
  })
})
