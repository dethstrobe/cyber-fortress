export interface Coordinates {
  x: number
  y: number
}

export interface PlayerState extends Coordinates {}

export interface EnemyState {
  hp: number
}

export type TileOption = "O" | "X"

export type GameMap = TileOption[][]

export type EnemyLocation = (number | undefined)[][]

export type PlayerActions = "move" | "attack" | "wait"
