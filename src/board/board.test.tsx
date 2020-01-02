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
      move: jest.fn(),
      attack: jest.fn(),
      player: { x: 3, y: 3, speed: 2.5 },
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
      it("should dispatch the move action when clicking", () => {
        const { getByTestId, props } = setup()
        const canvas = getByTestId("game-board")
        fireEvent.click(canvas, {
          clientX: center.x,
          clientY: center.y - 100,
        })
        expect(props.move).toHaveBeenCalledWith({ x: 3, y: 2 })
        expect(props.attack).not.toHaveBeenCalledWith()
      })
    })

    describe("attack", () => {
      it("should dispatch an attack action when clicking on a tile", () => {
        const { getByTestId, props } = setup("attack")
        fireEvent.click(getByTestId("game-board"), {
          clientX: center.x + 100,
          clientY: center.y - 100,
        })
        expect(props.move).not.toHaveBeenCalled()
        expect(props.attack).toHaveBeenCalledWith({ x: 4, y: 2 })
      })
    })
  })
})
