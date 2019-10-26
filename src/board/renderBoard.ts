interface BoardOptions {
  scale: number
  offsetX: number
  offsetY: number
}

export const renderBoard = (
  ctx: CanvasRenderingContext2D,
  { scale, offsetX, offsetY }: BoardOptions,
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.beginPath()
  for (let x = 0; x < 8; ++x) {
    for (let y = 0; y < 8; ++y) {
      ctx.rect(x * scale + offsetX, y * scale + offsetY, scale, scale)
    }
  }

  ctx.stroke()

  // player
  ctx.fillStyle = "red"
  ctx.fillRect(0, 0, scale, scale)
}
