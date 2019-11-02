import gameReducer from "./game.reducer"

describe("Game Reducer", () => {
  it("should return state if an invalid action is passed", () => {
    const state = { player: { x: 1, y: 2 } }

    const actual = gameReducer(state, { type: "TACO" } as any)

    expect(actual).toBe(state)
  })
})
