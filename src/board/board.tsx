import React, { useEffect } from "react"
import { locationState, moveAction } from "../reducers/location.reducer"
import { connect } from "react-redux"
import { State } from "../reducers"
import { renderBoard, Center } from "./renderBoard"

type Props = {
  moveAction: (payload: locationState) => void
  location: locationState
}

function findCenter(canvas: HTMLCanvasElement, scale: number): Center {
  const halfScale = scale / 2
  return {
    x: canvas.width / 2 - halfScale,
    y: canvas.height / 2 - halfScale,
  }
}

const scale = 100

const Board: React.FC<Props> = ({ moveAction, location }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) return
    const ctx = canvas.getContext("2d"),
      center = findCenter(canvas, scale)
    if (ctx)
      renderBoard(ctx, {
        scale,
        center,
        offset: { x: scale * location.x, y: scale * location.y },
      })
  }, [location])

  return (
    <canvas
      data-testid="game-board"
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={e => {
        if (!canvasRef.current) return
        const center = findCenter(canvasRef.current, scale)
        moveAction({
          x: Math.ceil((center.x - e.clientX) / scale),
          y: Math.ceil((center.y - e.clientY) / scale),
        })
      }}
    />
  )
}

const mapStateToProps = (state: State) => ({
  location: state.location,
})

export default connect(
  mapStateToProps,
  { moveAction },
)(Board)
export { Board }
