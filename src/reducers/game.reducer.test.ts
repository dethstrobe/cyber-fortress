import gameReducer, { State } from "./game.reducer"

describe("Game Reducer", () => {
  it("should return state if an invalid action is passed", () => {
    const state: State = { player: { x: 1, y: 2 }, map: [] }

    const actual = gameReducer(state, { type: "TACO" } as any)

    expect(actual).toBe(state)
  })
})
