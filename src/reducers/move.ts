import { State, ReducerTypes } from "./game.reducer"

export enum MOVE_ACTIONS {
  up = "MOVE_UP",
  down = "MOVE_DOWN",
  left = "MOVE_LEFT",
  right = "MOVE_RIGHT",
}

const wallTile = "X"

export const moveActions = {
  up() {
    return { type: MOVE_ACTIONS.up }
  },
  down() {
    return { type: MOVE_ACTIONS.down }
  },
  left() {
    return { type: MOVE_ACTIONS.left }
  },
  right() {
    return { type: MOVE_ACTIONS.right }
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

export const moveReducers: ReducerTypes = {
  [MOVE_ACTIONS.up](state) {
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
  [MOVE_ACTIONS.down](state) {
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
  [MOVE_ACTIONS.left](state) {
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
  [MOVE_ACTIONS.right](state) {
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
