import { enemyReducer } from "."
import { State, _ } from "../game.reducer"
import { GameMap, EnemyLocation, EnemyState } from "../types"

describe("enemy reducer", () => {
  const setup = (
    map?: GameMap,
    enemyLocations?: EnemyLocation,
    enemies?: EnemyState[],
  ): State => {
    const state = new State()
    if (map) state.map = map
    if (enemyLocations) state.enemyLocations = enemyLocations
    if (enemies) state.enemies = enemies

    return state
  }
  describe("enemy movement", () => {
    it("enemies move toward their waypoint", () => {
      const newState = enemyReducer(
        setup(
          [
            ["O", "O", "O", "O"],
            ["O", "O", "O", "O"],
            ["O", "O", "O", "O"],
            ["O", "O", "O", "O"],
          ],
          [
            [_, _, _, _],
            [_, _, _, _],
            [_, _, _, _],
            [_, _, 0, _],
          ],
          [new EnemyState({ action: [{ x: 2, y: 0 }] })],
        ),
      )

      expect(newState.enemyLocations).toEqual([
        [_, _, _, _],
        [_, _, _, _],
        [_, _, 0, _],
        [_, _, _, _],
      ])
    })
  })
})
