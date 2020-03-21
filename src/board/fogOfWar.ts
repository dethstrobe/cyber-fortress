import { GameMap, Coordinates, TileOption } from "../reducers/types"
import { isPathClearToMoveTo } from "../reducers/move"

export const findBoardVisibility = (
  map: GameMap,
  player: Coordinates,
): GameMap =>
  map.map((row, y) => row.map((tile, x) => isTileVisible(map, x, y, player)))

export const isTileVisible = (
  map: GameMap,
  x: number,
  y: number,
  player: Coordinates,
): TileOption => (isPathClearToMoveTo({ x, y }, player, map) ? map[y][x] : "S")
