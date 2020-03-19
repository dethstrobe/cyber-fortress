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
  steps: Coordinates[]
}

export class EnemyState implements PlayerState {
  x = 0
  y = 0
  hp = 3
  speed = 1.3
  actions: Coordinates[] = []
  actionIndex?: number
  steps: Coordinates[] = []
  // This constructor might be a bad idea, review later
  constructor(config = {}) {
    Object.assign(this, config)
  }
}

type wall = "X"
type space = "O"
type shadow = "S"

export type TileOption = wall | space | shadow

export type GameMap = TileOption[][]

export type EnemyLocation = (number | undefined)[][]
