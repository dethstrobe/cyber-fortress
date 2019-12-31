import React from "react"
import "./Menu.css"

export type PlayerActions = "move" | "attack" | "wait"

export interface Props {
  setPlayerAction: (action: PlayerActions) => void
}

export const Menu: React.FC<Props> = ({ setPlayerAction }) => (
  <menu className="player-menu">
    <ul className="player-menu--actions">
      <li className="player-menu--actions--action">
        <label>
          Actions
          <select
            className="player-menu--actions--action--select-action"
            onChange={e => setPlayerAction(e.target.value as PlayerActions)}
          >
            <option value="move">Move</option>
            <option value="attack">Attack</option>
            <option value="wait">Wait</option>
          </select>
        </label>
      </li>
    </ul>
  </menu>
)
