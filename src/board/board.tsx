import React, { useEffect } from "react"
import { locationState, moveAction } from "../reducers/location.reducer"
import { connect } from "react-redux"
import { State } from "../reducers"
import { renderBoard } from "./renderBoard"

type Props = {
  moveAction: (payload: locationState) => void
  location: locationState
}

const scale = 100

const Board: React.FC<Props> = ({ moveAction, location }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas && canvas.getContext("2d")
    if (ctx)
      renderBoard(ctx, {
        scale,
        offsetX: scale * location.x,
        offsetY: scale * location.y,
      })
  }, [location])

  return (
    <canvas
      data-testid="game-board"
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={e => {
        moveAction({
          x: Math.floor(e.clientX / scale),
          y: Math.floor(e.clientY / scale),
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
