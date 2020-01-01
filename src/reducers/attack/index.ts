import { ACTIONS } from "../types"
import { ReducerFunction } from "../game.reducer"

export type AttackReducerType = {
  [ACTIONS.ATTACK]: ReducerFunction
}

export const attackReducers: AttackReducerType = {
  [ACTIONS.ATTACK](state) {
    return state
  },
}
