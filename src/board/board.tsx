import React from "react"
import { locationState, moveAction } from "../reducers/location.reducer"
import { connect } from "react-redux"
import { State } from "../reducers"

type Props = {
  moveAction: (payload: locationState) => void
  location: locationState
}

const Board: React.FC<Props> = ({ moveAction, location }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  return (
    <canvas
      data-testid="game-board"
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={e => {
        console.log(e.clientX, e.clientY, location)
        const canvas = canvasRef.current
        const ctx = canvas && canvas.getContext("2d")
        // implement draw on ctx here
        moveAction({ x: e.clientX, y: e.clientY })
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
