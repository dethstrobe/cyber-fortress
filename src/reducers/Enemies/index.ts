import { ReducerFunction } from "../game.reducer"
import { EnemyState, Coordinates, EnemyLocation } from "../types"

interface EnemyUpdater {
  index: number
  newLocation: Coordinates
}

export const enemyReducer: ReducerFunction = state => {
  const enemyUpdateQue: EnemyUpdater[] = []

  const newEnemyLocations: EnemyLocation = state.enemyLocations.map((row, y) =>
    row.map((tile, x) => {
      if (typeof tile === "number") {
        const enemy = state.enemies[tile],
          waypoint = enemy.actions[0]

        if (waypoint) {
          const theta = Math.atan((waypoint.y - y) / (waypoint.x - x)),
            newLocation = {
              x: Math.round(Math.cos(theta) * enemy.speed) + x,
              y: Math.round(Math.sin(theta) * enemy.speed) + y,
            }

          enemyUpdateQue.push({ index: tile, newLocation })
          return undefined
        }
      }

      return tile
    }),
  )

  if (enemyUpdateQue.length === 0) return state

  enemyUpdateQue.forEach(({ index, newLocation }) => {
    newEnemyLocations[newLocation.y][newLocation.x] = index
  })

  return { ...state, enemyLocations: newEnemyLocations }
}
