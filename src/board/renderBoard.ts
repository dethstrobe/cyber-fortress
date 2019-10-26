export interface Center {
  x: number
  y: number
}

interface BoardOptions {
  scale: number
  offset: { x: number; y: number }
  center: Center
}

export const renderBoard = (
  ctx: CanvasRenderingContext2D,
  { scale, center, offset }: BoardOptions,
) => {
  const { width, height } = ctx.canvas,
    offsetX = center.x + offset.x,
    offsetY = center.y + offset.y

  ctx.clearRect(0, 0, width, height)
  ctx.beginPath()
  for (let x = 0; x < 8; ++x) {
    for (let y = 0; y < 8; ++y) {
      ctx.rect(x * scale + offsetX, y * scale + offsetY, scale, scale)
    }
  }

  ctx.stroke()

  // player
  ctx.fillStyle = "red"
  ctx.fillRect(center.x, center.y, scale, scale)
}
