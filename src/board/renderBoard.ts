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

function generateDrawBoard(
  ctx: CanvasRenderingContext2D,
  map: TileOption[][],
  enemyLocations: EnemyLocation,
  enemies: EnemyState[],
  scale: number,
  player: PlayerState,
  center: Coordinates,
): (timestamp: number) => void {
  let start: number,
    currentStepIndex = 0,
    enemyCurrentStepIndices = enemies.map(() => 0)

  const drawBoard = (timestamp: number) => {
    const { width, height } = ctx.canvas

    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()

    if (!start) start = timestamp
    const time = timestamp - start,
      progress = time / (300 / (player.steps.length || 2)),
      currentStep = player.steps[currentStepIndex] ?? player,
      nextStep = player.steps[currentStepIndex + 1] ?? player,
      currentOffsetX = center.x - currentStep.x * scale,
      currentOffsetY = center.y - currentStep.y * scale,
      nextOffsetX = center.x - nextStep.x * scale,
      nextOffsetY = center.y - nextStep.y * scale,
      offsetX = currentOffsetX - (currentOffsetX - nextOffsetX) * progress,
      offsetY = currentOffsetY - (currentOffsetY - nextOffsetY) * progress

    map.forEach((row, y) => {
      row.forEach((tile, x) => {
        const { stroke, fill } = tileRenderOptions[tile]
        ctx.fillStyle = fill
        ctx.strokeStyle = stroke

        ctx.fillRect(x * scale + offsetX, y * scale + offsetY, scale, scale)
      })
    })

    if (progress < 1) {
      requestAnimationFrame(drawBoard)
    } else if (currentStepIndex < player.steps.length - 1) {
      ++currentStepIndex
      start = timestamp
      requestAnimationFrame(drawBoard)
    } else {
      drawPlayerMovementRange(ctx, scale, offsetX, offsetY, map, player)
    }
    drawEnemies(
      ctx,
      scale,
      offsetX,
      offsetY,
      time,
      enemies,
      enemyCurrentStepIndices,
    )
    drawPlayer(ctx, center, scale)
  }

  return drawBoard
}

function drawEnemies(
  ctx: CanvasRenderingContext2D,
  scale: number,
  offsetX: number,
  offsetY: number,
  time: number,
  enemies: EnemyState[],
  enemyCurrentStepIndices: number[],
) {
  enemies.forEach((enemy, index) => {
    if (enemy.hp > 0) {
      const currentStepIndex = enemyCurrentStepIndices[index],
        progress = time / (300 / (enemy.steps.length || 2)),
        currentStep = enemy.steps[currentStepIndex] ?? enemy,
        nextStep = enemy.steps[currentStepIndex + 1] ?? enemy,
        currentOffsetX = currentStep.x * scale,
        currentOffsetY = currentStep.y * scale,
        nextOffsetX = nextStep.x * scale,
        nextOffsetY = nextStep.y * scale,
        enemyOffsetX =
          currentOffsetX - (currentOffsetX - nextOffsetX) * progress,
        enemyOffsetY =
          currentOffsetY - (currentOffsetY - nextOffsetY) * progress

      ctx.fillStyle = `rgba(0, 0, 255, 0.${enemy.hp})`
      ctx.strokeStyle = "white"
      ctx.fillRect(enemyOffsetX + offsetX, enemyOffsetY + offsetY, scale, scale)

      if (progress > 1) {
        ++enemyCurrentStepIndices[index]
      }
    }
  })
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
  const drawBoard = generateDrawBoard(
    ctx,
    map,
    enemyLocations,
    enemies,
    scale,
    player,
    center,
  )

  requestAnimationFrame(drawBoard)
}
