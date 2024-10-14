import { useRef, useState, useEffect, useCallback } from 'react';
import { PlayerProps } from '../interfaces';

const apiURL = 'https://timer-gamer-1.onrender.com/api/users';

export const Player: React.FC<PlayerProps> = ({ setUserData }) => {
	const [playerName, setPlayerName] = useState<string>('unknown');
	const playerNameRef = useRef<HTMLInputElement | null>(null);

	const fetchData = useCallback(async () => {
		if (!playerName || playerName.trim() === 'unknown') return;

		try {
			const response = await fetch(`${apiURL}/userCheck`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userName: playerName }),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			setUserData(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}, [playerName, setUserData]);

	useEffect(() => {
		fetchData();
	}, [playerName, fetchData]);

	const handleSetName = useCallback(() => {
		if (playerNameRef.current) {
			const sound = new Audio('/arcade-casino.wav');
			sound.play();
			const currentInputValue = playerNameRef.current.value.trim();
			setPlayerName(currentInputValue || 'unknown');
			playerNameRef.current.value = '';
		}
	}, []);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') handleSetName();
		},
		[handleSetName]
	);

	return (
		<section id="player">
			<h2>Welcome {playerName} entity</h2>
			<p>
				<input type="text" ref={playerNameRef} onKeyDown={handleKeyDown} defaultValue={playerName} placeholder="Enter your name" />
				<button onClick={handleSetName}>Set Name</button>
			</p>
		</section>
	);
};

export default Player;
