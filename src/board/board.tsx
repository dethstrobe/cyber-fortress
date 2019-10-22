import React from "react"
import { locationState } from "../reducers/location.reducer"

type Props = {
  moveAction: (payload: locationState) => void
}

const Board: React.FC<Props> = ({ moveAction }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  return (
    <canvas
      data-testid="game-board"
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={e => {
        const canvas = canvasRef.current
        const ctx = canvas && canvas.getContext("2d")
        // implement draw on ctx here
        moveAction({ x: e.clientX, y: e.clientY })
      }}
    />
  )
}

export { Board }
