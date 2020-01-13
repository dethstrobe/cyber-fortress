import { moveReducers, MoveReducerTypes } from "./move"
import {
  ActionObject,
  EnemyState,
  EnemyLocation,
  GameMap,
  PlayerState,
} from "./types"
import { AttackReducerType, attackReducers } from "./attack"
import { enemyReducer } from "./Enemies"

export const _ = undefined

export class State {
  player: PlayerState = {
    x: 0,
    y: 0,
    speed: 2.5,
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
    [_, _, _, _, _, 1, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ]
  enemies: EnemyState[] = [
    new EnemyState(),
    new EnemyState({ hp: 5, moving: "up" }),
  ]
}

export type ReducerFunction = (state: State, payload?: any) => State

const noAction: ReducerFunction = (state: State) => state

export type ReducerTypes = MoveReducerTypes & AttackReducerType

const reducers: ReducerTypes = {
  ...moveReducers,
  ...attackReducers,
}

export default (state: State = new State(), { type, payload }: ActionObject) =>
  enemyReducer((reducers[type] || noAction)(state, payload))
