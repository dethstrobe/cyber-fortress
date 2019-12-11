import { GameMap, TileOption, EnemyState } from "../reducers/game.reducer"

export interface Coordinates {
  x: number
  y: number
}

interface BoardOptions {
  scale: number
  offset: Coordinates
  center: Coordinates
  map: GameMap
  enemies: EnemyState[]
}

type TileOptions = {
  [key in TileOption]: { stroke: string; fill: string }
}

const tileRenderOptions: TileOptions = {
  O: { stroke: "blue", fill: "lightgray" },
  X: { stroke: "black", fill: "black" },
}

function drawBoard(
  ctx: CanvasRenderingContext2D,
  map: TileOption[][],
  scale: number,
  offsetX: number,
  offsetY: number,
) {
  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      const { stroke, fill } = tileRenderOptions[tile]
      ctx.fillStyle = fill
      ctx.strokeStyle = stroke
      ctx.fillRect(x * scale + offsetX, y * scale + offsetY, scale, scale)
    })
  })
}

function drawPlayer(
  ctx: CanvasRenderingContext2D,
  center: Coordinates,
  scale: number,
) {
  ctx.fillStyle = "red"
  ctx.fillRect(center.x, center.y, scale, scale)
}

export const renderBoard = (
  ctx: CanvasRenderingContext2D,
  { scale, center, offset, map, enemies }: BoardOptions,
) => {
  const { width, height } = ctx.canvas,
    offsetX = center.x - offset.x,
    offsetY = center.y - offset.y

  ctx.clearRect(0, 0, width, height)
  ctx.beginPath()

  drawBoard(ctx, map, scale, offsetX, offsetY)

  // player
  drawPlayer(ctx, center, scale)

  // enemies
  enemies.forEach(enemy => {
    drawPlayer(ctx, enemy, scale)
  })
}
