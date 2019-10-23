export const MOVE_ACTION = "MOVE_ACTION"

export const moveAction = (payload: locationState) => ({
  type: MOVE_ACTION,
  payload,
})

const actions = {
  [MOVE_ACTION](state: locationState, payload: locationState) {
    return {
      x: state.x + payload.x,
      y: state.y + payload.y,
    }
  },
  default(state: locationState) {
    return state
  },
}

export interface locationState {
  x: number
  y: number
}

export interface moveAction {
  type: typeof MOVE_ACTION
  payload: locationState
}

export default (
  state: locationState = { x: 0, y: 0 },
  { type, payload }: moveAction,
) => (actions[type] || actions.default)(state, payload)
