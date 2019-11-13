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

export const renderBoard = (
  ctx: CanvasRenderingContext2D,
  { scale, center, offset, map }: BoardOptions,
) => {
  const { width, height } = ctx.canvas,
    offsetX = center.x - offset.x,
    offsetY = center.y - offset.y

  ctx.clearRect(0, 0, width, height)
  ctx.beginPath()
  console.time("render map")
  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      ctx.rect(x * scale + offsetX, y * scale + offsetY, scale, scale)
    })
  })
  // for (let x = 0, xlen = map.length; x < xlen; ++x) {
  //   for (let y = 0, ylen = map[0].length; y < ylen; ++y) {
  //     ctx.rect(x * scale + offsetX, y * scale + offsetY, scale, scale)
  //   }
  // }

  ctx.stroke()
  console.timeEnd("render map")
  // player
  ctx.fillStyle = "red"
  ctx.fillRect(center.x, center.y, scale, scale)
}
