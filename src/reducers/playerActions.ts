import { ReducerFunction, PlayerActions } from "./game.reducer"

export enum ACTION_ACTIONS {
  changeAction = "CHANGE_ACTION",
}

export type ActionReducerTypes = {
  [key in ACTION_ACTIONS]: ReducerFunction
}

export const actionReducers: ActionReducerTypes = {
  [ACTION_ACTIONS.changeAction](state, payload: PlayerActions) {
    return { ...state, action: payload }
  },
}
