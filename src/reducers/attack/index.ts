import { ACTIONS, Coordinates } from "../types"
import { ReducerFunction } from "../game.reducer"

export type AttackReducerType = {
  [ACTIONS.ATTACK]: ReducerFunction
}

export const AttackAction = (payload: Coordinates) => ({
  type: ACTIONS.ATTACK,
  payload,
})

export const attackReducers: AttackReducerType = {
  [ACTIONS.ATTACK](state, { x, y }: Coordinates) {
    const enemyIndex = state.enemyLocations[y][x]
    if (enemyIndex !== undefined) {
      const enemy = state.enemies[enemyIndex]

      return {
        ...state,
        enemies: [
          ...state.enemies.slice(0, enemyIndex),
          { ...enemy, hp: enemy.hp - 1 },
          ...state.enemies.slice(enemyIndex + 1),
        ],
      }
    }
    return state
  },
}
