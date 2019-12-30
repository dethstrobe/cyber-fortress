import React, { useState } from "react"
import "./App.css"
import Board from "./Board/Board"
import { Menu, PlayerActions } from "./Menu/Menu"

const App: React.FC = () => {
  const [selectedPlayerAction, setPlayerAction] = useState<PlayerActions>(
    "move",
  )
  return (
    <main>
      <Menu setPlayerAction={setPlayerAction} />
      <Board selectedPlayerAction={selectedPlayerAction} />
    </main>
  )
}

export default App
