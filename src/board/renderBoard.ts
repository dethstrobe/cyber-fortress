interface BoardOptions {
  scale: number
  offsetX: number
  offsetY: number
}

export const renderBoard = (
  ctx: CanvasRenderingContext2D,
  { scale, offsetX, offsetY }: BoardOptions,
) => {
  const { width, height } = ctx.canvas,
    halfScale = scale / 2,
    center = {
      x: width / 2 - halfScale,
      y: height / 2 - halfScale,
    }

  ctx.clearRect(0, 0, width, height)
  ctx.beginPath()
  for (let x = 0; x < 8; ++x) {
    for (let y = 0; y < 8; ++y) {
      ctx.rect(
        x * scale + offsetX + center.x,
        y * scale + offsetY + center.y,
        scale,
        scale,
      )
    }
  }

  ctx.stroke()

  // player
  ctx.fillStyle = "red"
  ctx.fillRect(center.x, center.y, scale, scale)
}
