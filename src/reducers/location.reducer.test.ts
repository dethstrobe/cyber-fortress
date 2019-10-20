import locationReducer, { MOVE_ACTION } from "./location.reducer"

describe("locationReducer", () => {
  describe("moveAction", () => {
    it("should update the players position", () => {
      const actual = locationReducer(undefined, {
        type: MOVE_ACTION,
        payload: { x: 1, y: 0 },
      })

      expect(actual).toEqual({ x: 1, y: 0 })
    })

    it("should return state if an invalid action is passed", () => {
      const state = { x: 1, y: 2 }

      const actual = locationReducer(state, { type: "TACO" } as any)

      expect(actual).toBe(state)
    })
  })
})
