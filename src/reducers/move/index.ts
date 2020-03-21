import { ReducerFunction } from "../game.reducer"
import { ACTIONS, Coordinates, GameMap, PlayerState } from "../types"

export type MoveReducerTypes = {
  [ACTIONS.MOVE]: ReducerFunction
}

export const moveActions = {
  move(payload: Coordinates) {
    return { type: ACTIONS.MOVE, payload }
  },
}

const isTileOnBoard = (map: GameMap, { x, y }: Coordinates): boolean =>
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

// TODO: replace findTheta with this later
const findTheta2 = (start: Coordinates, end: Coordinates) =>
  Math.atan2(start.y - end.y, start.x - end.x)

export const isTileBlocked = ({ x, y }: Coordinates, map: GameMap) =>
  map[y][x] === "X"

export const isPathClearToMoveTo = (
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
    isAdjacentXOffTheMap = adjacentX < 0 || adjacentX > map[0].length,
    isAdjacentYOffTheMap = adjacentY < 0 || adjacentY > map.length,
    adjacentTileX: PlayerState = { x: adjacentX, y: start.y, speed, steps: [] },
    adjacentTileY: PlayerState = { x: start.x, y: adjacentY, speed, steps: [] },
    adjacentDiagonalTile: PlayerState = {
      x: adjacentX,
      y: adjacentY,
      speed: start.speed - Math.sqrt(2),
      steps: [],
    },
    isXTileBlocked = isAdjacentXOffTheMap || isTileBlocked(adjacentTileX, map),
    isYTileBlock = isAdjacentYOffTheMap || isTileBlocked(adjacentTileY, map),
    isThereAChangeInX = start.x === end.x,
    isThereAChangeInY = start.y === end.y

  const tileToCheck: PlayerState[] = [
    ...(isThereAChangeInX || isXTileBlocked || isAdjacentXOffTheMap
      ? []
      : [adjacentTileX]),
    ...(isThereAChangeInY || isYTileBlock || isAdjacentYOffTheMap
      ? []
      : [adjacentTileY]),
    ...(isThereAChangeInY ||
    isThereAChangeInX ||
    isXTileBlocked ||
    isYTileBlock ||
    isAdjacentXOffTheMap ||
    isAdjacentYOffTheMap ||
    isTileBlocked(adjacentDiagonalTile, map)
      ? []
      : [adjacentDiagonalTile]),
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
  let theta = findTheta2(start, end) + Math.PI / 2
  const quatPi = Math.PI / 4,
    maxDistance = 1.4, // totally just a guess
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

export const findSteps = (
  start: PlayerState,
  end: Coordinates,
  map: GameMap,
): Coordinates[] => {
  const tiles = findTilesToCheck(start, end),
    jsonEndTile = JSON.stringify(end)

  const filtered = tiles.filter(
    tile =>
      isTileOnBoard(map, tile) && // Is the tile on the board
      !isTileBlocked(tile, map) && // is the tile an open space
      isPathClearToMoveTo(start, tile, map) && // can the tile be moved to
      isPathClearToMoveTo(tile, end, map) && // can the tile move to the end location
      findVector(tile, end) < start.speed - findVector(start, tile) && // is there enough movement to get here
      JSON.stringify(tile) !== jsonEndTile, //might need to rethink this.
  )

  return [{ x: start.x, y: start.y }, ...filtered, end]
}

export const moveReducers: MoveReducerTypes = {
  [ACTIONS.MOVE](state, nextStep: Coordinates) {
    if (
      isTileOnBoard(state.map, nextStep) &&
      findVector(state.player, nextStep) < state.player.speed
    ) {
      if (isPathClearToMoveTo(state.player, nextStep, state.map)) {
        return {
          ...state,
          player: {
            ...state.player,
            ...nextStep,
            steps: [{ x: state.player.x, y: state.player.y }, nextStep],
          },
        }
      } else if (foundAPath(state.player, nextStep, state.map)) {
        const steps = findSteps(state.player, nextStep, state.map)
        return {
          ...state,
          player: {
            ...state.player,
            ...nextStep,
            steps,
          },
        }
      }
    }

    return { ...state, player: { ...state.player, steps: [] } }
  },
}
