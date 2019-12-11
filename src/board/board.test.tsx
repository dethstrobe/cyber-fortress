import React from "react"
import { Board } from "./board"
import { render, fireEvent, waitForElement } from "@testing-library/react"
import { State } from "../reducers/game.reducer"

const center = {
  x: 512,
  y: 360,
}

const state = new State()

describe("<Board/>", () => {
  const setup = (location = { x: 3, y: 3 }) => {
    const moveActionsMock = {
      up: jest.fn(),
      down: jest.fn(),
      left: jest.fn(),
      right: jest.fn(),
    }
    const board = render(
      <Board
        player={location}
        {...moveActionsMock}
        map={state.map}
        enemies={[]}
      />,
    )
    return {
      ...board,
      moveActionsMock,
    }
  }

  describe("click event", () => {
    it("should dispatch the move up action when clicked above center", () => {
      const { getByTestId, moveActionsMock } = setup()
      const canvas = getByTestId("game-board")
      fireEvent.click(canvas, {
        clientX: center.x,
        clientY: center.y - 100,
      })
      expect(moveActionsMock.up).toHaveBeenCalled()
      expect(moveActionsMock.down).not.toHaveBeenCalled()
      expect(moveActionsMock.left).not.toHaveBeenCalled()
      expect(moveActionsMock.right).not.toHaveBeenCalled()
    })

    it("should dispatch the move down action when clicked below center", () => {
      const { getByTestId, moveActionsMock } = setup()
      fireEvent.click(getByTestId("game-board"), {
        clientX: center.x,
        clientY: center.y + 100,
      })
      expect(moveActionsMock.up).not.toHaveBeenCalled()
      expect(moveActionsMock.down).toHaveBeenCalled()
      expect(moveActionsMock.left).not.toHaveBeenCalled()
      expect(moveActionsMock.right).not.toHaveBeenCalled()
    })

    it("should dispatch the move right action when clicked right center", () => {
      const { getByTestId, moveActionsMock } = setup()
      fireEvent.click(getByTestId("game-board"), {
        clientX: center.x + 100,
        clientY: center.y,
      })
      expect(moveActionsMock.up).not.toHaveBeenCalled()
      expect(moveActionsMock.down).not.toHaveBeenCalled()
      expect(moveActionsMock.left).not.toHaveBeenCalled()
      expect(moveActionsMock.right).toHaveBeenCalled()
    })

    it("should dispatch the move left action when clicked left center", () => {
      const { getByTestId, moveActionsMock } = setup()
      fireEvent.click(getByTestId("game-board"), {
        clientX: center.x - 100,
        clientY: center.y,
      })
      expect(moveActionsMock.up).not.toHaveBeenCalled()
      expect(moveActionsMock.down).not.toHaveBeenCalled()
      expect(moveActionsMock.left).toHaveBeenCalled()
      expect(moveActionsMock.right).not.toHaveBeenCalled()
    })

    it("should not dispatch a move action when clicked in the center", () => {
      const { getByTestId, moveActionsMock } = setup()
      fireEvent.click(getByTestId("game-board"), {
        clientX: center.x,
        clientY: center.y,
      })
      expect(moveActionsMock.up).not.toHaveBeenCalled()
      expect(moveActionsMock.down).not.toHaveBeenCalled()
      expect(moveActionsMock.left).not.toHaveBeenCalled()
      expect(moveActionsMock.right).not.toHaveBeenCalled()
    })
  })
})
