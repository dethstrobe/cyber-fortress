import {
  Coordinates,
  GameMap,
  TileOption,
  EnemyState,
  EnemyLocation,
  PlayerState,
} from "../reducers/types"

interface BoardOptions {
  scale: number
  player: PlayerState
  center: Coordinates
  map: GameMap
  enemies: EnemyState[]
  enemyLocations: EnemyLocation
}

type TileOptions = {
  [key in TileOption]: { stroke: string; fill: string }
}

const tileRenderOptions: TileOptions = {
  O: { stroke: "blue", fill: "lightgray" },
  X: { stroke: "black", fill: "black" },
}

function drawBoard(
  ctx: CanvasRenderingContext2D,
  map: TileOption[][],
  enemyLocations: EnemyLocation,
  enemies: EnemyState[],
  scale: number,
  offsetX: number,
  offsetY: number,
) {
  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      const enemyTile = enemyLocations[y][x]

      if (typeof enemyTile === "number") {
        ctx.fillStyle = `rgba(0, 0, 255, 0.${enemies[enemyTile].hp})`
        ctx.strokeStyle = "white"
      } else {
        const { stroke, fill } = tileRenderOptions[tile]
        ctx.fillStyle = fill
        ctx.strokeStyle = stroke
      }

      ctx.fillRect(x * scale + offsetX, y * scale + offsetY, scale, scale)
    })
  })
}

function drawPlayerMovementRange(map: GameMap, player: PlayerState) {}

function drawPlayer(
  ctx: CanvasRenderingContext2D,
  center: Coordinates,
  scale: number,
  color: string = "red",
) {
  ctx.fillStyle = color
  ctx.fillRect(center.x, center.y, scale, scale)
}

export const renderBoard = (
  ctx: CanvasRenderingContext2D,
  { scale, center, player, map, enemies, enemyLocations }: BoardOptions,
) => {
  const { width, height } = ctx.canvas,
    offsetX = center.x - scale * player.x,
    offsetY = center.y - scale * player.y

  ctx.clearRect(0, 0, width, height)
  ctx.beginPath()

  drawBoard(ctx, map, enemyLocations, enemies, scale, offsetX, offsetY)

  // player movement range
  // drawPlayerMovementRange()
  // player
  drawPlayer(ctx, center, scale)
}
