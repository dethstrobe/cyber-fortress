import { enemyReducer } from "."
import { State, _ } from "../State"
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
    it("should move toward their waypoint", () => {
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
              actions: [{ x: 2, y: 0 }],
              actionIndex: 0,
              x: 2,
              y: 3,
            }),
          ],
        ),
      )

      expect(newState.enemyLocations).toEqual([
        [_, _, _, _],
        [_, _, _, _],
        [_, _, 0, _],
        [_, _, _, _],
      ])
      const enemy = newState.enemies[0]
      expect(enemy.x).toBe(2)
      expect(enemy.y).toBe(2)
      expect(enemy.steps).toEqual([
        { x: 2, y: 3 },
        { x: 2, y: 2 },
      ])
    })

    it("should move toward their next waypoint once they reach current waypoint", () => {
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
              x: 2,
              y: 3,
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
      const enemy = newState.enemies[0]
      expect(enemy.x).toBe(1)
      expect(enemy.y).toBe(3)
      expect(enemy.steps).toEqual([
        { x: 2, y: 3 },
        { x: 1, y: 3 },
      ])
    })

    it("should stops if path is blocked", () => {
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
              x: 2,
              y: 3,
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
      const enemy = newState.enemies[0]
      expect(enemy.x).toBe(2)
      expect(enemy.y).toBe(3)
      expect(enemy.steps).toEqual([])
    })

    it("should go back the way they came once out of actions", () => {
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
              x: 2,
              y: 3,
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
      const enemy = newState.enemies[0]
      expect(enemy.x).toBe(1)
      expect(enemy.y).toBe(2)
      expect(enemy.steps).toEqual([
        { x: 2, y: 3 },
        { x: 1, y: 2 },
      ])
    })

    it("should prioritize top row enemies", () => {
      const newState = enemyReducer(
        setup(
          [
            ["O", "O", "O", "O"],
            ["O", "O", "O", "O"],
            ["O", "O", "O", "O"],
            ["O", "O", "O", "O"],
          ],
          [
            [_, 1, _, _],
            [0, _, _, _],
            [_, _, _, _],
            [_, _, _, _],
          ],
          [
            new EnemyState({
              actions: [
                { x: 3, y: 1 },
                { x: 0, y: 1 },
              ],
              actionIndex: 0,
              x: 0,
              y: 1,
            }),
            new EnemyState({
              actions: [
                { x: 1, y: 3 },
                { x: 1, y: 0 },
              ],
              actionIndex: 0,
              x: 1,
              y: 0,
            }),
          ],
        ),
      )

      expect(newState.enemyLocations).toEqual([
        [_, _, _, _],
        [0, 1, _, _],
        [_, _, _, _],
        [_, _, _, _],
      ])
      const enemy0 = newState.enemies[0]
      expect(enemy0.x).toBe(0)
      expect(enemy0.y).toBe(1)
      expect(enemy0.steps).toEqual([])
      const enemy1 = newState.enemies[1]
      expect(enemy1.x).toBe(1)
      expect(enemy1.y).toBe(1)
      expect(enemy1.steps).toEqual([
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ])
    })

    it("should not move on to the player", () => {
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
            [0, _, _, _],
            [_, _, _, _],
            [_, _, _, _],
          ],
          [
            new EnemyState({
              actions: [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
              ],
              actionIndex: 0,
              x: 0,
              y: 1,
            }),
          ],
        ),
      )

      expect(newState.enemyLocations).toEqual([
        [_, _, _, _],
        [0, _, _, _],
        [_, _, _, _],
        [_, _, _, _],
      ])
      const enemy = newState.enemies[0]
      expect(enemy.x).toBe(0)
      expect(enemy.y).toBe(1)
      expect(enemy.steps).toEqual([])
    })
  })
})
