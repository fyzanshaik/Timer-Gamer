import { useRef } from "react";
import { useState } from "react";

export default function Player() {
  // const [playerName, setPlayerName] = useState("");
  const [playerName, setPlayerName] = useState("unknown")
  const playerNameRef = useRef();
  const handleSetName = () => {
    const currentInputValue = playerNameRef.current.value;
    if (currentInputValue.trim()) {
      setPlayerName(currentInputValue)
      playerNameRef.current.value = ""
    } else {
      setPlayerName("unknown")
    }
  }

  const handleKeyDown = (e) => { if (e.key == "Enter") handleSetName(); }

  return (
    <section id="player">
      <h2>Welcome {playerName} entity</h2>
      <p>
        <input type="text" ref={playerNameRef} onKeyDown={handleKeyDown} defaultValue={playerName} placeholder="Enter your name" />
        <button onClick={handleSetName} >Set Name</button>
      </p>
    </section>
  );
}
