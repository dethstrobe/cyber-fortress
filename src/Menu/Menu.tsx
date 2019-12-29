import React from "react"

export type PlayerActions = "move" | "attack" | "wait"

export interface Props {
  setPlayerAction: (action: PlayerActions) => void
}

export const Menu: React.FC<Props> = ({ setPlayerAction }) => (
  <menu>
    <ul>
      <li>
        <label htmlFor="player-action">Actions</label>
        <select
          id="player-action"
          onChange={e => setPlayerAction(e.target.value as PlayerActions)}
        >
          <option value="move">Move</option>
          <option value="attack">Attack</option>
          <option value="wait">Wait</option>
        </select>
      </li>
    </ul>
  </menu>
)
