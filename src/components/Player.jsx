import { useState } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState("");
  const [userState, setUserState] = useState("unknown")

  const handleSetName = () => {
    if (playerName.trim()) {
      setUserState(playerName)
    } else {
      setUserState("unknown")
    }
  }
  
  const handleKeyDown = (e) => { if (e.key == "Enter") handleSetName(); }

  return (
    <section id="player">
      <h2>Welcome {userState} entity</h2>
      <p>
        <input type="text" onChange={(e) => { setPlayerName(e.target.value) }} onKeyDown={handleKeyDown} />
        <button onClick={handleSetName} >Set Name</button>
      </p>
    </section>
  );
}
