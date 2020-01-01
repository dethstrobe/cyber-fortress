export enum ACTIONS {
  ATTACK = "ATTACK",
  // MOVE = "MOVE",
  up = "MOVE_UP",
  down = "MOVE_DOWN",
  left = "MOVE_LEFT",
  right = "MOVE_RIGHT",
}

export interface Coordinates {
  x: number
  y: number
}

export interface ActionObject {
  type: ACTIONS
  payload?: any
}

export interface PlayerState extends Coordinates {}

export interface EnemyState {
  hp: number
}

export type TileOption = "O" | "X"

export type GameMap = TileOption[][]

export type EnemyLocation = (number | undefined)[][]
