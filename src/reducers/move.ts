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

export const moveReducers: ReducerTypes = {
  [MOVE_ACTIONS.up](state: State) {
    const { x, y: currentY } = state.player,
      y = currentY - 1
    if (y < 0 || state.map[y][x] === wallTile) {
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
  [MOVE_ACTIONS.down](state: State) {
    const { x, y: currentY } = state.player,
      y = currentY + 1
    if (y >= state.map.length || state.map[y][x] === wallTile) {
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
  [MOVE_ACTIONS.left](state: State) {
    const { x: currentX, y } = state.player,
      x = currentX - 1
    if (x < 0 || state.map[y][x] === wallTile) {
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
  [MOVE_ACTIONS.right](state: State) {
    const { x: currentX, y } = state.player,
      x = currentX + 1
    if (x >= state.map[0].length || state.map[y][x] === wallTile) {
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
