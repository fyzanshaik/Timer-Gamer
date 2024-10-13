import { useRef, useState } from 'react';

export default function Player() {
	const [playerName, setPlayerName] = useState<string>('unknown');
	const playerNameRef = useRef<HTMLInputElement | null>(null);

	const handleSetName = () => {
		if (playerNameRef.current) {
			const currentInputValue = playerNameRef.current.value;
			if (currentInputValue.trim()) {
				setPlayerName(currentInputValue);
				playerNameRef.current.value = '';
			} else {
				setPlayerName('unknown');
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') handleSetName();
	};

	return (
		<section id="player">
			<h2>Welcome {playerName} entity</h2>
			<p>
				<input type="text" ref={playerNameRef} onKeyDown={handleKeyDown} defaultValue={playerName} placeholder="Enter your name" />
				<button onClick={handleSetName}>Set Name</button>
			</p>
		</section>
	);
}
