import { GameMap } from "../reducers/game.reducer"

export interface Coordinates {
  x: number
  y: number
}

interface BoardOptions {
  scale: number
  offset: Coordinates
  center: Coordinates
  map: GameMap
}

function drawBoard(
  ctx: CanvasRenderingContext2D,
  map: string[][],
  scale: number,
  offsetX: number,
  offsetY: number,
) {
  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      ctx.rect(x * scale + offsetX, y * scale + offsetY, scale, scale)
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
  { scale, center, offset, map }: BoardOptions,
) => {
  const { width, height } = ctx.canvas,
    offsetX = center.x - offset.x,
    offsetY = center.y - offset.y

  ctx.clearRect(0, 0, width, height)
  ctx.beginPath()

  drawBoard(ctx, map, scale, offsetX, offsetY)

  ctx.stroke()

  // player
  drawPlayer(ctx, center, scale)
}
