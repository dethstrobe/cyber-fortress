import { moveReducers, MOVE_ACTIONS } from "./move"

export interface PlayerState {
  x: number
  y: number
}

export class State {
  player: PlayerState = {
    x: 0,
    y: 0,
  }
}

const noAction = (state: State) => state

export type ReducerTypes = {
  [key in MOVE_ACTIONS]: (state: State) => State
}

const reducers: ReducerTypes = {
  ...moveReducers,
}

export interface MoveAction {
  type: MOVE_ACTIONS
}

const initState = new State()

export default (state: State = initState, { type }: MoveAction) =>
  (reducers[type] || noAction)(state)
