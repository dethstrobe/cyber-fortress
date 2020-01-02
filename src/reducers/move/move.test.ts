import gameReducer, { State, _ } from "../game.reducer"
import { ACTIONS, Coordinates } from "../types"

describe("move actions", () => {
  const initState = (location: Coordinates = { x: 2, y: 3 }): State => {
    const newState = new State()
    newState.player = { ...newState.player, ...location }
    newState.map = [
      ["O", "O", "O", "X"],
      ["O", "O", "O", "X"],
      ["O", "O", "O", "X"],
      ["O", "O", "O", "O"],
      ["O", "O", "X", "O"],
    ]
    newState.enemyLocations = [
      [_, _, _, _],
      [_, 0, _, _],
      [_, _, _, _],
      [_, _, _, _],
      [_, _, _, _],
    ]
    return newState
  }
  describe("move", () => {
    it("should move to a tile within the player's range", () => {
      const actual = gameReducer(initState(), {
        type: ACTIONS.MOVE,
        payload: { x: 2, y: 2 },
      })

      expect(actual.player.x).toEqual(2)
      expect(actual.player.y).toEqual(2)
    })
  })
})
