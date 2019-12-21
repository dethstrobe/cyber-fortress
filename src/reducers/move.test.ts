import gameReducer, { State, _ } from "./game.reducer"
import { MOVE_ACTIONS } from "./move"

describe("move actions", () => {
  const initState = ({ x, y } = { x: 2, y: 3 }): State => {
    const newState = new State()
    newState.player = { x, y }
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

    it("should not be able to move on a tile with an enemy", () => {
      const state = initState({ x: 1, y: 2 })
      const actual = gameReducer(state, {
        type: MOVE_ACTIONS.up,
      })

      expect(actual).toEqual(state)
    })

    it("cannot move to a negative y tile", () => {
      const state = initState({ x: 2, y: 0 })
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

    it("should not be able to move on to an X tile", () => {
      const state = initState({ x: 2, y: 3 })
      const actual = gameReducer(state, {
        type: MOVE_ACTIONS.down,
      })

      expect(actual).toEqual(state)
    })

    it("should not be able to move on a tile with an enemy", () => {
      const state = initState({ x: 1, y: 0 })
      const actual = gameReducer(state, {
        type: MOVE_ACTIONS.down,
      })

      expect(actual).toEqual(state)
    })

    it("cannot move be able to move the range of the map", () => {
      const state = initState({ x: 1, y: 4 })
      const actual = gameReducer(state, {
        type: MOVE_ACTIONS.down,
      })

      expect(actual).toEqual(state)
    })
  })
  describe("move left", () => {
    it("should decrease the X value", () => {
      const actual = gameReducer(initState(), {
        type: MOVE_ACTIONS.left,
      })

      expect(actual.player).toEqual({ x: 1, y: 3 })
    })

    it("should not be able to move on to a wall tile", () => {
      const state = initState({ x: 3, y: 4 }),
        actual = gameReducer(state, { type: MOVE_ACTIONS.left })

      expect(actual).toBe(state)
    })

    it("should not be able to move on a tile with an enemy", () => {
      const state = initState({ x: 2, y: 1 })
      const actual = gameReducer(state, {
        type: MOVE_ACTIONS.left,
      })

      expect(actual).toEqual(state)
    })

    it("should not move outside of the map", () => {
      const state = initState({ x: 0, y: 4 }),
        actual = gameReducer(state, { type: MOVE_ACTIONS.left })

      expect(actual).toBe(state)
    })
  })

  describe("move right", () => {
    it("should decrease the X value", () => {
      const actual = gameReducer(initState(), {
        type: MOVE_ACTIONS.right,
      })

      expect(actual.player).toEqual({ x: 3, y: 3 })
    })

    it("should not be able to move on to a wall tile", () => {
      const state = initState({ x: 2, y: 2 }),
        actual = gameReducer(state, { type: MOVE_ACTIONS.right })

      expect(actual).toBe(state)
    })

    it("should not be able to move on a tile with an enemy", () => {
      const state = initState({ x: 0, y: 1 })
      const actual = gameReducer(state, {
        type: MOVE_ACTIONS.right,
      })

      expect(actual).toEqual(state)
    })

    it("should not move outside of the map", () => {
      const state = initState({ x: 3, y: 4 }),
        actual = gameReducer(state, { type: MOVE_ACTIONS.right })

      expect(actual).toBe(state)
    })
  })
})
