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

type incrementExpression = (i: number) => number
type loopCondition = (i: number, end: number) => boolean

const incrementLoop: incrementExpression = i => ++i,
  decrmentLoop: incrementExpression = i => --i,
  isLoopAtMax: loopCondition = (i, end) => i <= end,
  isLoopAtMin: loopCondition = (i, end) => i >= end,
  generateLoop = (isLoopingUp: boolean) => {
    const loopDirection = isLoopingUp ? incrementLoop : decrmentLoop,
      isLoopDone = isLoopingUp ? isLoopAtMax : isLoopAtMin

    return (
      start: number,
      end: number,
      callback: (i: number) => boolean,
    ): boolean => {
      let isBlocking: boolean = false

      for (let i = start; isLoopDone(i, end); i = loopDirection(i)) {
        isBlocking = callback(i)
        if (isBlocking) return isBlocking
      }

      return isBlocking
    }
  }

const isPathClearToMoveTo = (
  start: Coordinates,
  end: Coordinates,
  map: GameMap,
): boolean => {
  const Θ = Math.sin((start.y - end.y) / findVector(start, end)),
    QuatPi = Math.PI / 4,
    maxΘ = Θ + QuatPi,
    minΘ = Θ - QuatPi,
    xLoop = generateLoop(start.x < end.x),
    yLoop = generateLoop(start.y < end.y)

  return !xLoop(start.x, end.x, x =>
    yLoop(start.y, end.y, y => {
      const tileΘ = Math.sin((start.y - y) / findVector(start, { x, y }))
      return maxΘ > tileΘ && minΘ < tileΘ && map[y][x] === "X"
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
