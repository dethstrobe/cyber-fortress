import { moveReducers, MOVE_ACTIONS, MoveReducerTypes } from "./move"
import { EnemyState, EnemyLocation, GameMap, PlayerState } from "./types"

export const _ = undefined

export class State {
  player: PlayerState = {
    x: 0,
    y: 0,
  }
  map: GameMap = [
    ["O", "O", "O", "X", "O", "O", "O", "X", "O", "O"],
    ["O", "O", "O", "X", "O", "O", "O", "X", "O", "O"],
    ["O", "O", "O", "X", "X", "O", "X", "X", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
  ]
  enemyLocations: EnemyLocation = [
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, 0, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ]
  enemies: EnemyState[] = [{ hp: 3 }]
}

export type ReducerFunction = (state: State, payload?: any) => State

const noAction: ReducerFunction = (state: State) => state

export type ReducerTypes = MoveReducerTypes

const reducers: ReducerTypes = {
  ...moveReducers,
}

interface ActionCreators {
  type: MOVE_ACTIONS
  payload?: any
}

export default (
  state: State = new State(),
  { type, payload }: ActionCreators,
) => (reducers[type] || noAction)(state, payload)
