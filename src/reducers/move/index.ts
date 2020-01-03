import { State, ReducerFunction } from "../game.reducer"
import { ACTIONS, Coordinates } from "../types"

export type MoveReducerTypes = {
  [ACTIONS.MOVE]: ReducerFunction
}

const wallTile = "X"

export const moveActions = {
  move(payload: Coordinates) {
    return { type: ACTIONS.MOVE, payload }
  },
}

const isTileOnBoard = ({ map }: State, { x, y }: Coordinates): boolean =>
  y > 0 && x > 0 && y < map.length && x < map[0].length

export const moveReducers: MoveReducerTypes = {
  [ACTIONS.MOVE](state, nextStep: Coordinates) {
    if (isTileOnBoard(state, nextStep)) {
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
