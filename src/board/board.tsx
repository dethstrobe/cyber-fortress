import React, { useEffect } from "react"
import { locationState, moveActions } from "../reducers/location.reducer"
import { connect } from "react-redux"
import { State } from "../reducers"
import { renderBoard, Center } from "./renderBoard"

type Props = {
  up: () => void
  down: () => void
  left: () => void
  right: () => void
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

const Board: React.FC<Props> = ({ up, down, left, right, location }) => {
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
        const loc = {
          x: Math.floor((e.clientX - center.x) / scale),
          y: Math.floor((e.clientY - center.y) / scale),
        }

        if (loc.y < 0) {
          up()
        } else if (loc.y > 0) {
          down()
        } else if (loc.x > 0) {
          right()
        } else if (loc.x < 0) {
          left()
        }
      }}
    />
  )
}

const mapStateToProps = (state: State) => ({
  location: state.location,
})

export default connect(
  mapStateToProps,
  { ...moveActions },
)(Board)
export { Board }
