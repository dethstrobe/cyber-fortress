import React from "react"
import { Board, Props } from "./Board"
import { render, fireEvent } from "@testing-library/react"
import { State } from "../reducers/game.reducer"
import { PlayerActions } from "../Menu/Menu"

const center = {
  x: 512,
  y: 360,
}

const { map, enemies, enemyLocations } = new State()

describe("<Board/>", () => {
  const setup = (selectedPlayerAction: PlayerActions = "move") => {
    const props: Props = {
      up: jest.fn(),
      down: jest.fn(),
      left: jest.fn(),
      right: jest.fn(),
      attack: jest.fn(),
      player: { x: 3, y: 3 },
      map,
      enemies,
      enemyLocations,
      selectedPlayerAction,
    }

    return {
      ...render(<Board {...props} />),
      props,
    }
  }

  describe("click event", () => {
    describe("move", () => {
      it("should dispatch the move up action when clicked above center", () => {
        const { getByTestId, props } = setup()
        const canvas = getByTestId("game-board")
        fireEvent.click(canvas, {
          clientX: center.x,
          clientY: center.y - 100,
        })
        expect(props.up).toHaveBeenCalled()
        expect(props.down).not.toHaveBeenCalled()
        expect(props.left).not.toHaveBeenCalled()
        expect(props.right).not.toHaveBeenCalled()
      })

      it("should dispatch the move down action when clicked below center", () => {
        const { getByTestId, props } = setup()
        fireEvent.click(getByTestId("game-board"), {
          clientX: center.x,
          clientY: center.y + 100,
        })
        expect(props.up).not.toHaveBeenCalled()
        expect(props.down).toHaveBeenCalled()
        expect(props.left).not.toHaveBeenCalled()
        expect(props.right).not.toHaveBeenCalled()
      })

      it("should dispatch the move right action when clicked right center", () => {
        const { getByTestId, props } = setup()
        fireEvent.click(getByTestId("game-board"), {
          clientX: center.x + 100,
          clientY: center.y,
        })
        expect(props.up).not.toHaveBeenCalled()
        expect(props.down).not.toHaveBeenCalled()
        expect(props.left).not.toHaveBeenCalled()
        expect(props.right).toHaveBeenCalled()
      })

      it("should dispatch the move left action when clicked left center", () => {
        const { getByTestId, props } = setup()
        fireEvent.click(getByTestId("game-board"), {
          clientX: center.x - 100,
          clientY: center.y,
        })
        expect(props.up).not.toHaveBeenCalled()
        expect(props.down).not.toHaveBeenCalled()
        expect(props.left).toHaveBeenCalled()
        expect(props.right).not.toHaveBeenCalled()
      })

      it("should not dispatch a move action when clicked in the center", () => {
        const { getByTestId, props } = setup()
        fireEvent.click(getByTestId("game-board"), {
          clientX: center.x,
          clientY: center.y,
        })
        expect(props.up).not.toHaveBeenCalled()
        expect(props.down).not.toHaveBeenCalled()
        expect(props.left).not.toHaveBeenCalled()
        expect(props.right).not.toHaveBeenCalled()
      })
    })

    describe("attack", () => {
      it("should dispatch an attack action when clicking on a tile", () => {
        const { getByTestId, props } = setup("attack")
        fireEvent.click(getByTestId("game-board"), {
          clientX: center.x + 100,
          clientY: center.y - 100,
        })
        expect(props.up).not.toHaveBeenCalled()
        expect(props.attack).toHaveBeenCalledWith({ x: 4, y: 2 })
      })
    })
  })
})
