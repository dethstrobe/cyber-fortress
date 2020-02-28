import { findBoardVisibility } from "./fogOfWar"
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
      ["O", "O", "O", "O", "O"],
      ["O", "O", "O", "O", "O"],
      ["S", "X", "O", "O", "O"],
      ["O", "O", "O", "O", "O"],
      ["O", "O", "O", "O", "O"],
    ])
  })
})
