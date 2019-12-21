import gameReducer, { State } from "./game.reducer"
import { ACTION_ACTIONS } from "./playerActions"

describe("player actions", () => {
  const initState = new State()
  describe("changeAction", () => {
    it("should set the current action to attack", () => {
      const actual = gameReducer(initState, {
        type: ACTION_ACTIONS.changeAction,
        payload: "attack",
      })

      expect(actual.action).toBe("attack")
      expect(initState.action).toBe("move")
    })
  })
})
