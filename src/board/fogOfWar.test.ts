import { findBoardVisibility, isTileVisible } from "./fogOfWar"
import { GameMap, Coordinates } from "../reducers/types"

xdescribe("fogOfWar", () => {
  it("should have shadow tiles behind walls", () => {
    const map: GameMap = [
      ["O", "O", "O", "O", "O"],
      ["O", "O", "O", "O", "O"],
      ["O", "X", "O", "O", "O"],
      ["O", "O", "O", "O", "O"],
      ["O", "O", "O", "O", "O"],
    ]
    const player: Coordinates = {
      x: 2,
      y: 2,
    }

    expect(findBoardVisibility(map, player)).toEqual([
      ["O", "O", "O", "O", "O"],
      ["O", "O", "O", "O", "O"],
      ["S", "X", "O", "O", "O"],
      ["O", "O", "O", "O", "O"],
      ["O", "O", "O", "O", "O"],
    ])
  })
})

describe("isTileVisible", () => {
  const map: GameMap = [
    ["O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O"],
    ["O", "X", "O", "O", "O"],
    ["O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O"],
  ]
  it("should return the tile if there is nothing blocking it", () => {
    expect(isTileVisible(map, 2, 0, { x: 2, y: 2 })).toBe(map[0][2])
  })
})
