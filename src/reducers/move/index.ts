import { State, ReducerFunction } from "../game.reducer"
import { ACTIONS, Coordinates, GameMap } from "../types"

export type MoveReducerTypes = {
  [ACTIONS.MOVE]: ReducerFunction
}

export const moveActions = {
  move(payload: Coordinates) {
    return { type: ACTIONS.MOVE, payload }
  },
}

const isTileOnBoard = ({ map }: State, { x, y }: Coordinates): boolean =>
  y >= 0 && x >= 0 && y < map.length && x < map[0].length

const findVector = (start: Coordinates, end: Coordinates): number =>
  Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2))

const loopUp = (
  start: number,
  end: number,
  callback: (i: number) => boolean,
): boolean => {
  let isBlocking: boolean = false
  for (let i = start; i <= end; ++i) {
    isBlocking = callback(i)
    if (isBlocking) return isBlocking
  }

  return isBlocking
}

const loopDown = (
  start: number,
  end: number,
  callback: (i: number) => boolean,
): boolean => {
  let isBlocking: boolean = false

  for (let i = start; i >= end; --i) {
    isBlocking = callback(i)
    if (isBlocking) return isBlocking
  }

  return isBlocking
}

const isPathClearToMoveTo = (
  start: Coordinates,
  end: Coordinates,
  map: GameMap,
): boolean => {
  const opposite = start.y - end.y,
    hypotenuse = findVector(start, end),
    Θ = Math.sin(opposite / hypotenuse),
    QuatPi = Math.PI / 4,
    ΘMax = Θ + QuatPi,
    ΘMin = Θ - QuatPi,
    xLoop = start.x < end.x ? loopUp : loopDown,
    yLoop = start.y < end.y ? loopUp : loopDown

  return !xLoop(start.x, end.x, x =>
    yLoop(start.y, end.y, y => {
      const tileΘ = Math.sin((start.y - y) / findVector(start, { x, y }))
      return ΘMax > tileΘ && ΘMin < tileΘ && map[y][x] === "X"
    }),
  )
}

export const moveReducers: MoveReducerTypes = {
  [ACTIONS.MOVE](state, nextStep: Coordinates) {
    if (
      isTileOnBoard(state, nextStep) &&
      findVector(state.player, nextStep) < state.player.speed &&
      isPathClearToMoveTo(state.player, nextStep, state.map)
    ) {
      return {
        ...state,
        player: {
          ...state.player,
          ...nextStep,
        },
      }
    }

    return state
  },
}
