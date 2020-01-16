import { enemyReducer } from "."
import { State, _ } from "../game.reducer"
import { GameMap, EnemyLocation } from "../types"

describe("enemy reducer", () => {
  const setup = (map?: GameMap, enemyLocations?: EnemyLocation): State => {
    const state = new State()
    if (map) state.map = map
    if (enemyLocations) state.enemyLocations = enemyLocations

    return state
  }
  describe("enemy movement", () => {
    it("enemies should move the direction that want to", () => {
      const newState = enemyReducer(setup())

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

    it("should head the opposite direction once it hits the edge of the map", () => {
      const newState = enemyReducer(
        setup(
          [
            ["O", "O", "O", "X"],
            ["O", "O", "O", "X"],
            ["O", "O", "O", "X"],
            ["O", "O", "O", "O"],
          ],
          [
            [_, 1, _, _],
            [_, _, _, _],
            [_, _, _, _],
            [_, _, 0, _],
          ],
        ),
      )

      expect(newState.enemyLocations).toEqual([
        [_, _, _, _],
        [_, 1, _, _],
        [_, _, 0, _],
        [_, _, _, _],
      ])
    })
  })
})
