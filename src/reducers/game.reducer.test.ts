import gameReducer from "./game.reducer"
import { State } from "./State"
import { EnemyState } from "./types"

describe("Game Reducer", () => {
  it("should return state if an invalid action is passed", () => {
    const state: State = new State([new EnemyState()])

    const actual = gameReducer(state, { type: "TACO" } as any)

    expect(actual).toEqual(state)
  })
})
