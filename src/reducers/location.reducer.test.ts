import locationReducer, { MOVE_ACTIONS } from "./location.reducer"

describe("locationReducer", () => {
  describe("move up", () => {
    it("should decrease the Y value", () => {
      const actual = locationReducer(
        { x: 2, y: 3 },
        {
          type: MOVE_ACTIONS.up,
        },
      )

      expect(actual).toEqual({ x: 2, y: 2 })
    })
  })

  describe("move down", () => {
    it("should increase the Y value", () => {
      const actual = locationReducer(undefined, {
        type: MOVE_ACTIONS.down,
      })

      expect(actual).toEqual({ x: 0, y: 1 })
    })
  })
  describe("move left", () => {
    it("should decrease the X value", () => {
      const actual = locationReducer(
        { x: 2, y: 3 },
        {
          type: MOVE_ACTIONS.left,
        },
      )

      expect(actual).toEqual({ x: 1, y: 3 })
    })
  })

  describe("move right", () => {
    it("should decrease the X value", () => {
      const actual = locationReducer(
        { x: 2, y: 3 },
        {
          type: MOVE_ACTIONS.right,
        },
      )

      expect(actual).toEqual({ x: 3, y: 3 })
    })
  })

  it("should return state if an invalid action is passed", () => {
    const state = { x: 1, y: 2 }

    const actual = locationReducer(state, { type: "TACO" } as any)

    expect(actual).toBe(state)
  })
})
