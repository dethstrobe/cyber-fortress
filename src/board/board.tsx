import React, { useEffect, useCallback } from "react"
import { moveActions } from "../reducers/move"
import { State } from "../reducers/game.reducer"
import {
  PlayerState,
  GameMap,
  EnemyState,
  EnemyLocation,
} from "../reducers/types"
import { connect } from "react-redux"
import { renderBoard } from "./renderBoard"

type Props = {
  up: () => void
  down: () => void
  left: () => void
  right: () => void
  player: PlayerState
  map: GameMap
  enemyLocations: EnemyLocation
  enemies: EnemyState[]
}

const scale = 100

const Board: React.FC<Props> = ({
  up,
  down,
  left,
  right,
  player,
  map,
  enemies,
  enemyLocations,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const findCenter = useCallback((canvas: HTMLCanvasElement) => {
    const halfScale = scale / 2

    return {
      x: canvas.width / 2 - halfScale,
      y: canvas.height / 2 - halfScale,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) return
    const ctx = canvas.getContext("2d"),
      center = findCenter(canvas)
    if (ctx)
      renderBoard(ctx, {
        scale,
        center,
        offset: { x: scale * player.x, y: scale * player.y },
        map,
        enemies,
        enemyLocations,
      })
  }, [player, enemies, map, enemyLocations, findCenter])

  return (
    <canvas
      data-testid="game-board"
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={e => {
        if (!canvasRef.current) return
        const center = findCenter(canvasRef.current)
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

const mapStateToProps = ({ player, map, enemies, enemyLocations }: State) => ({
  player,
  map,
  enemies,
  enemyLocations,
})

export default connect(mapStateToProps, { ...moveActions })(Board)
export { Board }
