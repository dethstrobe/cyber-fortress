import { State, ReducerFunction } from "./game.reducer"
import { ACTIONS } from "./types"

export type MoveReducerTypes = {
  [ACTIONS.up]: ReducerFunction
  [ACTIONS.down]: ReducerFunction
  [ACTIONS.left]: ReducerFunction
  [ACTIONS.right]: ReducerFunction
}

const wallTile = "X"

export const moveActions = {
  up() {
    return { type: ACTIONS.up }
  },
  down() {
    return { type: ACTIONS.down }
  },
  left() {
    return { type: ACTIONS.left }
  },
  right() {
    return { type: ACTIONS.right }
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
  [ACTIONS.up](state) {
    const { x, y: currentY } = state.player,
      y = currentY - 1
    if (isValidTileToMoveTo(state, y < 0, x, y)) {
      return state
    }
    return {
      ...state,
      player: {
        ...state.player,
        y,
      },
    }
  },
  [ACTIONS.down](state) {
    const { x, y: currentY } = state.player,
      y = currentY + 1
    if (isValidTileToMoveTo(state, y >= state.map.length, x, y)) {
      return state
    }
    return {
      ...state,
      player: {
        ...state.player,
        y,
      },
    }
  },
  [ACTIONS.left](state) {
    const { x: currentX, y } = state.player,
      x = currentX - 1
    if (isValidTileToMoveTo(state, x < 0, x, y)) {
      return state
    }
    return {
      ...state,
      player: {
        ...state.player,
        x,
      },
    }
  },
  [ACTIONS.right](state) {
    const { x: currentX, y } = state.player,
      x = currentX + 1
    if (isValidTileToMoveTo(state, x >= state.map[0].length, x, y)) {
      return state
    }
    return {
      ...state,
      player: {
        ...state.player,
        x,
      },
    }
  },
}
