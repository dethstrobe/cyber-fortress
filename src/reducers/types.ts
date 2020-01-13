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

type enemyMovementDirection = "down" | "up"

export class EnemyState {
  hp: number = 3
  moving: enemyMovementDirection = "down"
  // This constructor might be a bad idea, review later
  constructor(config = {}) {
    Object.assign(this, config)
  }
}

export type TileOption = "O" | "X"

export type GameMap = TileOption[][]

export type EnemyLocation = (number | undefined)[][]
