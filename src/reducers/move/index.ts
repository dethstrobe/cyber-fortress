import { State, ReducerFunction } from "../game.reducer"
import { ACTIONS, Coordinates, GameMap } from "../types"

export type MoveReducerTypes = {
  [ACTIONS.MOVE]: ReducerFunction
}

export const moveActions = {
  move(payload: Coordinates) {
    return { type: ACTIONS.MOVE, payload }
  },
}

const isTileOnBoard = ({ map }: State, { x, y }: Coordinates): boolean =>
  y >= 0 && x >= 0 && y < map.length && x < map[0].length

const findVector = (start: Coordinates, end: Coordinates): number =>
  Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2))

const isPathClearToMoveTo = (
  start: Coordinates,
  end: Coordinates,
  map: GameMap,
): boolean => {
  const opposite = start.y - end.y,
    hypotenuse = findVector(start, end),
    Θ = Math.sin(opposite / hypotenuse)

  for (let i = start.x; i <= end.x; ++i) {
    for (let j = start.y; j <= end.y; ++j) {
      if (
        Θ === Math.sin((start.y - j) / findVector(start, { x: i, y: j })) &&
        map[j][i] === "X"
      ) {
        return false
      }
    }
  }

  return true
}

export const moveReducers: MoveReducerTypes = {
  [ACTIONS.MOVE](state, nextStep: Coordinates) {
    if (
      isTileOnBoard(state, nextStep) &&
      findVector(state.player, nextStep) < state.player.speed &&
      isPathClearToMoveTo(state.player, nextStep, state.map)
    ) {
      return {
        ...state,
        player: {
          ...state.player,
          ...nextStep,
        },
      }
    }

    return state
  },
}
