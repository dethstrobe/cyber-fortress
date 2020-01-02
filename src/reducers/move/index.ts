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

const isValidTileToMoveTo = (
  { map, enemyLocations }: State,
  isTileOnBoard: boolean,
  x: number,
  y: number,
) =>
  isTileOnBoard ||
  map[y][x] === wallTile ||
  typeof enemyLocations[y][x] === "number"

export const moveReducers: MoveReducerTypes = {
  [ACTIONS.MOVE](state, payload: Coordinates) {
    return {
      ...state,
      player: {
        ...state.player,
        ...payload,
      },
    }
  },
}
