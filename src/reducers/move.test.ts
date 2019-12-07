import gameReducer, { State } from "./game.reducer"
import { MOVE_ACTIONS } from "./move"

describe("move actions", () => {
  const initState = ({ x, y } = { x: 2, y: 3 }): State => ({
    player: { x, y },
    map: [
      ["O", "O", "O", "X"],
      ["O", "O", "O", "X"],
      ["O", "O", "O", "X"],
      ["O", "O", "O", "O"],
      ["O", "O", "O", "O"],
    ],
  })
  describe("move up", () => {
    it("should decrease the Y value", () => {
      const actual = gameReducer(initState(), {
        type: MOVE_ACTIONS.up,
      })

      expect(actual.player).toEqual({ x: 2, y: 2 })
    })

    it("should not be able to move on to an X tile", () => {
      const state = initState({ x: 3, y: 3 })
      const actual = gameReducer(state, {
        type: MOVE_ACTIONS.up,
      })

      expect(actual).toEqual(state)
    })
  })

  describe("move down", () => {
    it("should increase the Y value", () => {
      const actual = gameReducer(undefined, {
        type: MOVE_ACTIONS.down,
      })

      expect(actual.player).toEqual({ x: 0, y: 1 })
    })
  })
  describe("move left", () => {
    it("should decrease the X value", () => {
      const actual = gameReducer(initState(), {
        type: MOVE_ACTIONS.left,
      })

      expect(actual.player).toEqual({ x: 1, y: 3 })
    })
  })

  describe("move right", () => {
    it("should decrease the X value", () => {
      const actual = gameReducer(initState(), {
        type: MOVE_ACTIONS.right,
      })

      expect(actual.player).toEqual({ x: 3, y: 3 })
    })
  })
})
