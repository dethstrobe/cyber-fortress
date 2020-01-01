import gameReducer, { State, _ } from "../game.reducer"
import { ACTIONS } from "../types"

describe("attack actions", () => {
  const initState = new State()
  it("should lower an enemy's HP if clicking on them", () => {
    const actual = gameReducer(initState, {
      type: ACTIONS.ATTACK,
      payload: { x: 2, y: 2 },
    })

    expect(actual.enemies[0].hp).toBe(2)
  })
})
