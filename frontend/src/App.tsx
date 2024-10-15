import { useEffect, useState } from 'react';
import Player from './components/Player.js';
import TimerChallenge from './components/TimerChallenge.js';
import { Header } from './components/Header.js';
import { UserData } from './interfaces.ts';

function App() {
	const [userData, setUserData] = useState<UserData | null>(null);
	const [serverCheck, setServerCheck] = useState(false);
	const [loading, setLoading] = useState(true);
	const userScores = userData?.scores?.[0];
	const userId = userScores?.userId || 1;

	const timerChallengeArray = [
		{ title: 'Quick Reflex', targetTime: 1, highScore: userScores?.timer1Score ?? 0 },
		{ title: 'Speed Test', targetTime: 5, highScore: userScores?.timer5Score ?? 0 },
		{ title: 'Endurance', targetTime: 10, highScore: userScores?.timer10Score ?? 0 },
		{ title: 'Focus Mode', targetTime: 15, highScore: userScores?.timer15Score ?? 0 },
		{ title: 'Ultimate Challenge', targetTime: 30, highScore: userScores?.timer30Score ?? 0 },
	];

	const checkServerHealth = async () => {
		try {
			const response = await fetch('https://timer-gamer-1.onrender.com/');
			const data = await response.json();
			if (data) {
				setServerCheck(true);
				setLoading(false);
				new Audio('/game-start.mp3').play();
			}
		} catch {
			console.error('Error checking server status');
		}
	};

	console.log(loading);

	useEffect(() => {
		const interval = setInterval(() => {
			checkServerHealth();
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			{serverCheck ? (
				<>
					<Header />
					<Player setUserData={setUserData} userData={userData} />

					<div id="challenges">
						{timerChallengeArray.map(({ title, targetTime, highScore }) => (
							<TimerChallenge key={title} title={title} targetTime={targetTime} userId={userId} highScore={highScore} />
						))}
					</div>
				</>
			) : (
				<div className="loading-container">
					<div className="loading-animation"></div>
					<h1>Checking server status... Please wait ⏳</h1>
				</div>
			)}
		</>
	);
}

export default App;
