import { moveReducers, MoveReducerTypes } from "./move"
import {
  ActionObject,
  EnemyState,
  EnemyLocation,
  GameMap,
  PlayerState,
} from "./types"
import { AttackReducerType, attackReducers } from "./attack"

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

export type ReducerTypes = MoveReducerTypes & AttackReducerType

const reducers: ReducerTypes = {
  ...moveReducers,
  ...attackReducers,
}

export default (state: State = new State(), { type, payload }: ActionObject) =>
  (reducers[type] || noAction)(state, payload)
