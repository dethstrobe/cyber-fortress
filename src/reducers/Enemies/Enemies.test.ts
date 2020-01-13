import { enemyReducer } from "."
import { State, _ } from "../game.reducer"

const state = new State()

describe("enemy reducer", () => {
  describe("enemy movement", () => {
    it("enemies should move the direction that want to", () => {
      const newState = enemyReducer(state)

      expect(newState.enemyLocations).toEqual([
        [_, _, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _],
        [_, _, 0, _, _, _, _, _, _, _],
        [_, _, _, _, _, 1, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _, _],
      ])
    })
  })
})
