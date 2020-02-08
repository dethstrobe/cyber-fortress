import {
  Coordinates,
  GameMap,
  TileOption,
  EnemyState,
  EnemyLocation,
  PlayerState,
} from "../reducers/types"
import { foundAPath, findVector } from "../reducers/move"

interface BoardOptions {
  scale: number
  player: PlayerState
  center: Coordinates
  map: GameMap
  enemies: EnemyState[]
  enemyLocations: EnemyLocation
}

type TileOptions = {
  [key in TileOption]: { stroke: string; fill: string }
}

const tileRenderOptions: TileOptions = {
  O: { stroke: "blue", fill: "lightgray" },
  X: { stroke: "black", fill: "black" },
}

function drawBoardCurry(
  ctx: CanvasRenderingContext2D,
  map: TileOption[][],
  enemyLocations: EnemyLocation,
  enemies: EnemyState[],
  scale: number,
  player: PlayerState,
  center: Coordinates,
): (timestamp: number) => void {
  let start: number,
    currentStepIndex = 0
  const drawBoard = (timestamp: number) => {
    const { width, height } = ctx.canvas

    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()

    if (!start) start = timestamp
    const progress = (timestamp - start) / (300 / player.steps.length),
      currentStep = player.steps[currentStepIndex] ?? player,
      nextStep = player.steps[currentStepIndex + 1] ?? player

    const currentOffsetX = center.x - currentStep.x * scale,
      currentOffsetY = center.y - currentStep.y * scale,
      nextOffsetX = center.x - nextStep.x * scale,
      nextOffsetY = center.y - nextStep.y * scale,
      offsetX = currentOffsetX - (currentOffsetX - nextOffsetX) * progress,
      offsetY = currentOffsetY - (currentOffsetY - nextOffsetY) * progress

    map.forEach((row, y) => {
      row.forEach((tile, x) => {
        const enemyTile = enemyLocations[y][x]

        if (typeof enemyTile === "number") {
          ctx.fillStyle = `rgba(0, 0, 255, 0.${enemies[enemyTile].hp})`
          ctx.strokeStyle = "white"
        } else {
          const { stroke, fill } = tileRenderOptions[tile]
          ctx.fillStyle = fill
          ctx.strokeStyle = stroke
        }

        ctx.fillRect(x * scale + offsetX, y * scale + offsetY, scale, scale)
      })
    })
    // player
    drawPlayer(ctx, center, scale)

    if (progress < 1) {
      requestAnimationFrame(drawBoard)
    } else if (currentStepIndex < player.steps.length - 1) {
      ++currentStepIndex
      start = timestamp
      requestAnimationFrame(drawBoard)
    }
    // player movement range
    drawPlayerMovementRange(ctx, scale, offsetX, offsetY, map, player)
  }

  return drawBoard
}

function drawPlayerMovementRange(
  ctx: CanvasRenderingContext2D,
  scale: number,
  offsetX: number,
  offsetY: number,
  map: GameMap,
  player: PlayerState,
) {
  const startX = Math.floor(player.x - player.speed),
    endX = Math.floor(player.x + player.speed),
    startY = Math.floor(player.y - player.speed),
    endY = Math.floor(player.y + player.speed)

  for (
    let Y = startY < 0 ? 0 : startY,
      YStop = endY >= map.length ? map.length - 1 : endY;
    Y <= YStop;
    ++Y
  ) {
    for (
      let X = startX < 0 ? 0 : startX,
        XStop = endX >= map.length ? map.length - 1 : endX;
      X <= XStop;
      ++X
    ) {
      const tileToCheck = { x: X, y: Y }
      if (
        findVector(player, tileToCheck) < player.speed &&
        foundAPath(player, tileToCheck, map)
      ) {
        ctx.strokeStyle = "coral"
        ctx.strokeRect(X * scale + offsetX, Y * scale + offsetY, scale, scale)
      }
    }
  }
}

function drawPlayer(
  ctx: CanvasRenderingContext2D,
  center: Coordinates,
  scale: number,
  color: string = "red",
) {
  ctx.fillStyle = color
  ctx.fillRect(center.x, center.y, scale, scale)
}

export const renderBoard = (
  ctx: CanvasRenderingContext2D,
  { scale, center, player, map, enemies, enemyLocations }: BoardOptions,
) => {
  const drawboard = drawBoardCurry(
    ctx,
    map,
    enemyLocations,
    enemies,
    scale,
    player,
    center,
  )

  requestAnimationFrame(drawboard)
}
