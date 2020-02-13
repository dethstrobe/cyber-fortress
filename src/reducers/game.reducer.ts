import { moveReducers, MoveReducerTypes } from "./move"
import { ActionObject } from "./types"
import { AttackReducerType, attackReducers } from "./attack"
import { enemyReducer } from "./Enemies"
import { State } from "./State"

export type ReducerFunction = (state: State, payload?: any) => State

const noAction: ReducerFunction = (state: State) => state

export type ReducerTypes = MoveReducerTypes & AttackReducerType

const reducers: ReducerTypes = {
  ...moveReducers,
  ...attackReducers,
}

export default (state: State = new State(), { type, payload }: ActionObject) =>
  enemyReducer((reducers[type] ?? noAction)(state, payload))
