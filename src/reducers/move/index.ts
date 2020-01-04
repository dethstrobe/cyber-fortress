import { State, ReducerFunction } from "../game.reducer"
import { ACTIONS, Coordinates } from "../types"

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

export const moveReducers: MoveReducerTypes = {
  [ACTIONS.MOVE](state, nextStep: Coordinates) {
    if (
      isTileOnBoard(state, nextStep) &&
      findVector(state.player, nextStep) < state.player.speed
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
