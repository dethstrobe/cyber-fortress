import gameReducer from "./game.reducer"
import { State } from "./State"

describe("Game Reducer", () => {
  it("should return state if an invalid action is passed", () => {
    const state: State = new State()

    const actual = gameReducer(state, { type: "TACO" } as any)

    expect(actual).toBe(state)
  })
})
