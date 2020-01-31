import gameReducer, { State, _ } from "../game.reducer"
import { ACTIONS, Coordinates } from "../types"
import { foundAPath, findTilesToCheck } from "."

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
    const actual = gameReducer(initState({ x: 1, y: 2 }), {
      type: ACTIONS.MOVE,
      payload: { x: 0, y: 1 },
    })

    expect(actual.player.x).toEqual(0)
    expect(actual.player.y).toEqual(1)
    expect(actual.player.steps).toEqual([
      { x: 1, y: 2 },
      { x: 0, y: 1 },
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

    it("should be not able to find a path around obstacles further then the player's range", () => {
      const actual = gameReducer(initState({ x: 1, y: 4 }), {
        type: ACTIONS.MOVE,
        payload: { x: 3, y: 3 },
      })

      expect(actual.player.x).toEqual(1)
      expect(actual.player.y).toEqual(4)
      expect(actual.player.steps).toEqual([])
    })

    it("should be able to find a path around obstacles that are in player's range diagonally", () => {
      const actual = gameReducer(initState({ x: 0, y: 4 }), {
        type: ACTIONS.MOVE,
        payload: { x: 2, y: 3 },
      })

      expect(actual.player.x).toEqual(2)
      expect(actual.player.y).toEqual(3)
      expect(actual.player.steps).toEqual([
        { x: 0, y: 4 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
      ])
    })

    it("should not attempt to path find outside of the map", () => {
      const actual = gameReducer(initState({ x: 2, y: 0 }), {
        type: ACTIONS.MOVE,
        payload: { x: 0, y: 0 },
      })

      expect(actual.player.x).toEqual(2)
      expect(actual.player.y).toEqual(0)
      expect(actual.player.steps).toEqual([])
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
      expect(actual.player.steps).toEqual([])
    })

    it("should not allow the player to move through obstacles going from right to left", () => {
      const actual = gameReducer(initState({ x: 3, y: 4 }), {
        type: ACTIONS.MOVE,
        payload: { x: 1, y: 4 },
      })

      expect(actual.player.x).toEqual(3)
      expect(actual.player.y).toEqual(4)
      expect(actual.player.steps).toEqual([])
    })

    it("should not allow move throw walls diagonally", () => {
      const actual = gameReducer(initState({ x: 3, y: 3 }), {
        type: ACTIONS.MOVE,
        payload: { x: 2, y: 1 },
      })

      expect(actual.player.x).toEqual(3)
      expect(actual.player.y).toEqual(3)
      expect(actual.player.steps).toEqual([])
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
      expect(actual.player.steps).toEqual([])
    })

    it("left off the map", () => {
      const actual = gameReducer(initState({ x: 0, y: 0 }), {
        type: ACTIONS.MOVE,
        payload: { x: -1, y: 0 },
      })

      expect(actual.player.x).toEqual(0)
      expect(actual.player.y).toEqual(0)
      expect(actual.player.steps).toEqual([])
    })

    it("below the map", () => {
      const actual = gameReducer(initState({ x: 4, y: 4 }), {
        type: ACTIONS.MOVE,
        payload: { x: 4, y: 5 },
      })

      expect(actual.player.x).toEqual(4)
      expect(actual.player.y).toEqual(4)
      expect(actual.player.steps).toEqual([])
    })

    it("right off the map", () => {
      const actual = gameReducer(initState({ x: 4, y: 4 }), {
        type: ACTIONS.MOVE,
        payload: { x: 5, y: 4 },
      })

      expect(actual.player.x).toEqual(4)
      expect(actual.player.y).toEqual(4)
      expect(actual.player.steps).toEqual([])
    })
  })
})

describe("foundAPath", () => {
  const state = new State()
  it("should find a path to an adjacent tile", () => {
    expect(foundAPath(state.player, { x: 1, y: 0 }, state.map)).toBe(true)
  })
})

describe("findTilesToCheck", () => {
  it("should return any array of 5 tiles adjacent to the start and on the side towards the end", () => {
    expect(findTilesToCheck({ x: 1, y: 1 }, { x: 3, y: 3 })).toEqual([
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ])
  })

  it("should return an array of tiles to check going clockwise from the start", () => {
    expect(findTilesToCheck({ x: 1, y: 4 }, { x: 2, y: 3 })).toEqual([
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 2, y: 4 },
      { x: 2, y: 5 },
    ])
  })
})
