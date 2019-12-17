import { moveReducers, MOVE_ACTIONS } from "./move"

export interface PlayerState {
  x: number
  y: number
}

export interface EnemyState {
  hp: number
}

export type TileOption = "O" | "X"

export type GameMap = TileOption[][]

export type EnemyLocation = (number | undefined)[][]

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
