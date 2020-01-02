export enum ACTIONS {
  ATTACK = "ATTACK",
  MOVE = "MOVE",
}

export interface Coordinates {
  x: number
  y: number
}

export interface ActionObject {
  type: ACTIONS
  payload?: any
}

export interface PlayerState extends Coordinates {
  speed: number
}

export interface EnemyState {
  hp: number
}

export type TileOption = "O" | "X"

export type GameMap = TileOption[][]

export type EnemyLocation = (number | undefined)[][]
