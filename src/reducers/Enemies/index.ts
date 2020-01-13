import { ReducerFunction } from "../game.reducer"

interface TempLocation {
  [x: number]: {
    [y: number]: number
  }
}

export const enemyReducer: ReducerFunction = state => {
  const tempLoc: TempLocation = []
  const enemyLocations: (number | undefined)[][] = state.enemyLocations.map(
    (row, y) => {
      return row.map((tile, x) => {
        if (typeof tile === "number") {
          const enemyHere = state.enemies[tile],
            nextYStep = enemyHere.moving === "down" ? y + 1 : y - 1
          tempLoc[x] = {
            ...(tempLoc[x] || {}),
            [nextYStep]: tile,
          }
          return undefined
        }

        return undefined
      })
    },
  )

  Object.keys(tempLoc).forEach(x => {
    const rows = tempLoc[+x]
    Object.keys(rows).forEach(y => {
      const enemyIndex = rows[+y]
      enemyLocations[+y][+x] = enemyIndex
    })
  })
  return {
    ...state,
    enemyLocations,
  }
}
