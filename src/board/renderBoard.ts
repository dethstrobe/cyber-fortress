export const renderBoard = (ctx: CanvasRenderingContext2D) => {
  console.log(ctx)
  ctx.beginPath()
  ctx.rect(20, 20, 150, 100)
  ctx.stroke()
}
