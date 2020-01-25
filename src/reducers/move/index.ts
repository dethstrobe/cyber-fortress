import { State, ReducerFunction } from "../game.reducer"
import { ACTIONS, Coordinates, GameMap, PlayerState } from "../types"

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

export const findVector = (start: Coordinates, end: Coordinates): number =>
  Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2))

type incrementExpression = (i: number) => number
type loopCondition = (i: number, end: number) => boolean

const incrementLoop: incrementExpression = i => ++i,
  decrementLoop: incrementExpression = i => --i,
  isLoopAtMax: loopCondition = (i, end) => i <= end,
  isLoopAtMin: loopCondition = (i, end) => i >= end,
  generateLoop = (isLoopingUp: boolean) => {
    const loopDirection = isLoopingUp ? incrementLoop : decrementLoop,
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

const findTheta = (start: Coordinates, end: Coordinates) =>
  Math.sin((start.y - end.y) / findVector(start, end))

export const isTileBlocked = ({ x, y }: Coordinates, map: GameMap) =>
  map[y][x] === "X"

const isPathClearToMoveTo = (
  start: Coordinates,
  end: Coordinates,
  map: GameMap,
): boolean => {
  const Θ = findTheta(start, end),
    QuatPi = Math.PI / 4,
    maxΘ = Θ + QuatPi,
    minΘ = Θ - QuatPi,
    xLoop = generateLoop(start.x < end.x),
    yLoop = generateLoop(start.y < end.y)

  return !xLoop(start.x, end.x, x =>
    yLoop(start.y, end.y, y => {
      const tile = { x, y },
        tileΘ = Math.sin((start.y - y) / findVector(start, tile))
      return maxΘ > tileΘ && minΘ < tileΘ && isTileBlocked(tile, map)
    }),
  )
}

export const foundAPath = (
  start: PlayerState,
  end: Coordinates,
  map: GameMap,
): boolean => {
  // TODO: refactor this nightmare!
  const isBelow = start.y < end.y,
    isRight = start.x < end.x,
    speed = start.speed - 1,
    adjacentX = start.x + (isRight ? 1 : -1),
    adjacentY = start.y + (isBelow ? 1 : -1),
    isAdjeacentXOffTheMap = adjacentX < 0 || adjacentX > map[0].length,
    isAdjeacentYOffTheMap = adjacentY < 0 || adjacentY > map.length,
    adjacentTileX = { x: adjacentX, y: start.y, speed },
    adjacentTileY = { x: start.x, y: adjacentY, speed },
    adjecentDiagonalTile = {
      x: adjacentX,
      y: adjacentY,
      speed: start.speed - Math.sqrt(2),
    },
    isXTileBlocked = isAdjeacentXOffTheMap || isTileBlocked(adjacentTileX, map),
    isYTileBlock = isAdjeacentYOffTheMap || isTileBlocked(adjacentTileY, map),
    isThereAChangeInX = start.x === end.x,
    isThereAChangeInY = start.y === end.y

  const tileToCheck: PlayerState[] = [
    ...(isThereAChangeInX || isXTileBlocked || isAdjeacentXOffTheMap
      ? []
      : [adjacentTileX]),
    ...(isThereAChangeInY || isYTileBlock || isAdjeacentYOffTheMap
      ? []
      : [adjacentTileY]),
    ...(isThereAChangeInY ||
    isThereAChangeInX ||
    isXTileBlocked ||
    isYTileBlock ||
    isAdjeacentXOffTheMap ||
    isAdjeacentYOffTheMap ||
    isTileBlocked(adjecentDiagonalTile, map)
      ? []
      : [adjecentDiagonalTile]),
  ]

  return tileToCheck.some(
    tile =>
      (findVector(tile, end) < speed && isPathClearToMoveTo(tile, end, map)) ||
      foundAPath(tile, end, map),
  )
}

export const findTilesToCheck = (
  start: Coordinates,
  end: Coordinates,
): Coordinates[] => {
  let theta = findTheta(start, end)
  const quatPi = Math.PI / 4,
    maxDistance = 1.42,
    pointsToCheck: Coordinates[] = []

  for (let i = 0; i < 5; ++i) {
    const tile = {
      x: Math.round(Math.cos(theta) * maxDistance) + start.x,
      y: Math.round(Math.sin(theta) * maxDistance) + start.y,
    }
    pointsToCheck.push(tile)
    theta += quatPi
  }
  return pointsToCheck
}

const findSteps = (
  start: Coordinates,
  end: Coordinates,
  map: GameMap,
): Coordinates[] => {
  return [start, end]
}

export const moveReducers: MoveReducerTypes = {
  [ACTIONS.MOVE](state, nextStep: Coordinates) {
    if (
      isTileOnBoard(state, nextStep) &&
      findVector(state.player, nextStep) < state.player.speed &&
      (isPathClearToMoveTo(state.player, nextStep, state.map) ||
        foundAPath(state.player, nextStep, state.map))
    ) {
      const steps = findSteps(
        { x: state.player.x, y: state.player.y },
        nextStep,
        state.map,
      )
      return {
        ...state,
        player: {
          ...state.player,
          ...nextStep,
          steps,
        },
      }
    }

    return state
  },
}
