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

type Actions = {
  [key in MOVE_ACTIONS]: (state: locationState) => locationState
}

const actions: Actions = {
  [MOVE_ACTIONS.up](state: locationState) {
    return {
      ...state,
      y: state.y - 1,
    }
  },
  [MOVE_ACTIONS.down](state: locationState) {
    return {
      ...state,
      y: state.y + 1,
    }
  },
  [MOVE_ACTIONS.left](state: locationState) {
    return {
      ...state,
      x: state.x - 1,
    }
  },
  [MOVE_ACTIONS.right](state: locationState) {
    return {
      ...state,
      x: state.x + 1,
    }
  },
}

const noAction = (state: locationState) => state

export interface locationState {
  x: number
  y: number
}

export interface MoveAction {
  type: MOVE_ACTIONS
}

export default (state: locationState = { x: 0, y: 0 }, { type }: MoveAction) =>
  (actions[type] || noAction)(state)
