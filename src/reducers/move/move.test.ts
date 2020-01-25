import gameReducer, { State, _ } from "../game.reducer"
import { ACTIONS, Coordinates } from "../types"
import { foundAPath } from "."

describe("move action", () => {
  const initState = (location: Coordinates = { x: 2, y: 3 }): State => {
    const newState = new State()
    newState.player = { ...newState.player, ...location }
    newState.map = [
      ["O", "X", "O", "X"],
      ["O", "O", "O", "X"],
      ["O", "O", "X", "X"],
      ["O", "O", "O", "O"],
      ["O", "O", "X", "O"],
    ]
    newState.enemyLocations = [
      [_, _, _, _],
      [_, _, _, _],
      [_, _, _, _],
      [_, _, _, _],
      [_, _, _, _],
    ]
    return newState
  }

  it("should move to a tile within the player's range", () => {
    const actual = gameReducer(initState({ x: 1, y: 1 }), {
      type: ACTIONS.MOVE,
      payload: { x: 0, y: 0 },
    })

    expect(actual.player.x).toEqual(0)
    expect(actual.player.y).toEqual(0)
    expect(actual.player.steps).toEqual([
      { x: 1, y: 1 },
      { x: 0, y: 0 },
    ])
  })

  it("should not allow you to move beyond the player range", () => {
    const actual = gameReducer(initState({ x: 0, y: 0 }), {
      type: ACTIONS.MOVE,
      payload: { x: 0, y: 3 },
    })

    expect(actual.player.x).toEqual(0)
    expect(actual.player.y).toEqual(0)
    expect(actual.player.steps).toEqual([])
  })

  describe("path finding", () => {
    it("should be able to find a path around obsticales", () => {
      const actual = gameReducer(initState({ x: 1, y: 4 }), {
        type: ACTIONS.MOVE,
        payload: { x: 2, y: 3 },
      })

      expect(actual.player.x).toEqual(2)
      expect(actual.player.y).toEqual(3)
      expect(actual.player.steps).toEqual([
        { x: 1, y: 4 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
      ])
    })

    it("should be not able to find a path around obsticales further then the player's range", () => {
      const actual = gameReducer(initState({ x: 1, y: 4 }), {
        type: ACTIONS.MOVE,
        payload: { x: 3, y: 3 },
      })

      expect(actual.player.x).toEqual(1)
      expect(actual.player.y).toEqual(4)
    })

    it("should be able to find a path around obsticales that are in player's range diagonally", () => {
      const actual = gameReducer(initState({ x: 0, y: 4 }), {
        type: ACTIONS.MOVE,
        payload: { x: 2, y: 3 },
      })

      expect(actual.player.x).toEqual(2)
      expect(actual.player.y).toEqual(3)
    })

    it("should not attempt to path find outside of the map", () => {
      const actual = gameReducer(initState({ x: 2, y: 0 }), {
        type: ACTIONS.MOVE,
        payload: { x: 0, y: 0 },
      })

      expect(actual.player.x).toEqual(2)
      expect(actual.player.y).toEqual(0)
    })
  })

  describe("collision detection", () => {
    it("should not allow the player to move through obstacles", () => {
      const actual = gameReducer(initState({ x: 1, y: 4 }), {
        type: ACTIONS.MOVE,
        payload: { x: 3, y: 4 },
      })

      expect(actual.player.x).toEqual(1)
      expect(actual.player.y).toEqual(4)
    })

    it("should not allow the player to move through obstacles going from right to left", () => {
      const actual = gameReducer(initState({ x: 3, y: 4 }), {
        type: ACTIONS.MOVE,
        payload: { x: 1, y: 4 },
      })

      expect(actual.player.x).toEqual(3)
      expect(actual.player.y).toEqual(4)
    })

    it("should not allow move throw walls diagonally", () => {
      const actual = gameReducer(initState({ x: 3, y: 3 }), {
        type: ACTIONS.MOVE,
        payload: { x: 2, y: 1 },
      })

      expect(actual.player.x).toEqual(3)
      expect(actual.player.y).toEqual(3)
    })
  })

  describe("should not allow you to move", () => {
    it("above off the map", () => {
      const actual = gameReducer(initState({ x: 2, y: 0 }), {
        type: ACTIONS.MOVE,
        payload: { x: 2, y: -1 },
      })

      expect(actual.player.x).toEqual(2)
      expect(actual.player.y).toEqual(0)
    })

    it("left off the map", () => {
      const actual = gameReducer(initState({ x: 0, y: 0 }), {
        type: ACTIONS.MOVE,
        payload: { x: -1, y: 0 },
      })

      expect(actual.player.x).toEqual(0)
      expect(actual.player.y).toEqual(0)
    })

    it("below the map", () => {
      const actual = gameReducer(initState({ x: 4, y: 4 }), {
        type: ACTIONS.MOVE,
        payload: { x: 4, y: 5 },
      })

      expect(actual.player.x).toEqual(4)
      expect(actual.player.y).toEqual(4)
    })

    it("right off the map", () => {
      const actual = gameReducer(initState({ x: 4, y: 4 }), {
        type: ACTIONS.MOVE,
        payload: { x: 5, y: 4 },
      })

      expect(actual.player.x).toEqual(4)
      expect(actual.player.y).toEqual(4)
    })
  })
})

describe("foundAPath", () => {
  const state = new State()
  it("should find a path to an adjacent tile", () => {
    expect(foundAPath(state.player, { x: 1, y: 0 }, state.map)).toBe(true)
  })
})
