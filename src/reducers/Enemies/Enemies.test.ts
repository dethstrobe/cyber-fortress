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
          [new EnemyState({ actions: [{ x: 2, y: 0 }], actionIndex: 0 })],
        ),
      )

      expect(newState.enemyLocations).toEqual([
        [_, _, _, _],
        [_, _, _, _],
        [_, _, 0, _],
        [_, _, _, _],
      ])
    })

    it("enemies move toward their next waypoint once they reach current waypoint", () => {
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
          [
            new EnemyState({
              actions: [
                { x: 2, y: 3 },
                { x: 0, y: 3 },
              ],
              actionIndex: 0,
            }),
          ],
        ),
      )

      expect(newState.enemies[0].actionIndex).toBe(1)
      expect(newState.enemyLocations).toEqual([
        [_, _, _, _],
        [_, _, _, _],
        [_, _, _, _],
        [_, 0, _, _],
      ])
    })

    it("enemy stops if path is blocked", () => {
      const newState = enemyReducer(
        setup(
          [
            ["O", "O", "O", "O"],
            ["O", "O", "O", "O"],
            ["O", "O", "O", "O"],
            ["O", "X", "O", "O"],
          ],
          [
            [_, _, _, _],
            [_, _, _, _],
            [_, _, _, _],
            [_, _, 0, _],
          ],
          [
            new EnemyState({
              actions: [
                { x: 0, y: 3 },
                { x: 2, y: 3 },
              ],
              actionIndex: 0,
            }),
          ],
        ),
      )

      expect(newState.enemies[0].actionIndex).toBe(0)
      expect(newState.enemyLocations).toEqual([
        [_, _, _, _],
        [_, _, _, _],
        [_, _, _, _],
        [_, _, 0, _],
      ])
    })

    it("enemy go back the way they came once out of actions", () => {
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
          [
            new EnemyState({
              actions: [
                { x: 0, y: 1 },
                { x: 2, y: 3 },
              ],
              actionIndex: 1,
              speed: 1.5,
            }),
          ],
        ),
      )

      expect(newState.enemies[0].actionIndex).toBe(0)
      expect(newState.enemyLocations).toEqual([
        [_, _, _, _],
        [_, _, _, _],
        [_, 0, _, _],
        [_, _, _, _],
      ])
    })
  })
})
