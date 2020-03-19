import { GameMap, Coordinates, TileOption } from "../reducers/types"

export const findBoardVisibility = (
  map: GameMap,
  player: Coordinates,
): GameMap => map.map((row, y) => row.map((tile, x) => tile))

export const isTileVisible = (
  map: GameMap,
  x: number,
  y: number,
  player: Coordinates,
): TileOption => "O"
