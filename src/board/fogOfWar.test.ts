import { findBoardVisibility, isTileVisible } from "./fogOfWar"
import { GameMap, Coordinates } from "../reducers/types"

describe("fogOfWar", () => {
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
      ["S", "S", "O", "O", "O"],
      ["S", "S", "O", "O", "O"],
      ["S", "X", "O", "O", "O"],
      ["S", "S", "O", "O", "O"],
      ["S", "S", "O", "O", "O"],
    ])
  })
})

const map: GameMap = [
  ["O", "O", "O", "O", "O"],
  ["O", "O", "O", "O", "O"],
  ["O", "X", "O", "O", "O"],
  ["O", "O", "X", "O", "O"],
  ["O", "O", "O", "O", "O"],
]

const playerLocation = { x: 2, y: 2 }

describe("isTileVisible", () => {
  it("should return the tile if there is nothing blocking it", () => {
    expect(isTileVisible(map, 2, 0, playerLocation)).toBe(map[0][2])
  })
  it("should return 'S' if there is something blocking horizontally", () => {
    expect(isTileVisible(map, 0, 2, playerLocation)).toBe("S")
  })
  it("should return 'S' if there is something blocking the tile diagonally", () => {
    expect(isTileVisible(map, 1, 3, playerLocation)).toBe("S")
  })
  it("should return 'S' if there is something blocking vertically", () => {
    expect(isTileVisible(map, 2, 4, playerLocation)).toBe("S")
  })
  it("should return 'X' if the tile is a wall", () => {
    expect(isTileVisible(map, 1, 2, playerLocation)).toBe("X")
  })
})
