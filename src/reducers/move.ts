import { State, ReducerTypes } from "./game.reducer"

export enum MOVE_ACTIONS {
  up = "MOVE_UP",
  down = "MOVE_DOWN",
  left = "MOVE_LEFT",
  right = "MOVE_RIGHT",
}

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
    if (y < 0 || state.map[y][x] === "X") {
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
    return {
      ...state,
      player: {
        ...state.player,
        y: state.player.y + 1,
      },
    }
  },
  [MOVE_ACTIONS.left](state: State) {
    return {
      ...state,
      player: {
        ...state.player,
        x: state.player.x - 1,
      },
    }
  },
  [MOVE_ACTIONS.right](state: State) {
    return {
      ...state,
      player: {
        ...state.player,
        x: state.player.x + 1,
      },
    }
  },
}
