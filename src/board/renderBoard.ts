export const renderBoard = (ctx: CanvasRenderingContext2D) => {
  const scale = 100
  const offsetX = 1 * scale
  const offsetY = 1 * scale
  ctx.beginPath()
  for (let x = 0; x < 8; ++x) {
    for (let y = 0; y < 8; ++y) {
      ctx.rect(x * scale + offsetX, y * scale + offsetY, scale, scale)
    }
  }

  ctx.stroke()
}
