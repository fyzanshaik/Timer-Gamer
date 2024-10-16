import { useEffect, useState, useCallback } from 'react';
import Player from './components/Player';
import TimerChallenge from './components/TimerChallenge';
import { Header } from './components/Header';
import { UserData } from './interfaces.ts';
const apiURL = 'https://timer-gamer-1.onrender.com';

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

	const checkServerHealth = useCallback(async () => {
		try {
			const response = await fetch(`${apiURL}`);
			const data = await response.json();
			if (data) {
				setServerCheck(true);
				setLoading(false);
				console.log('Server running: ', !loading);
			}
		} catch {
			console.error('Error checking server status');
		}
	}, [loading]);

	useEffect(() => {
		const interval = setInterval(() => {
			checkServerHealth();
		}, 5000);

		return () => clearInterval(interval);
	}, [checkServerHealth]);

	return (
		<>
			{serverCheck ? (
				<>
					<Header />
					<Player setUserData={setUserData} userData={userData} />

					<div id="challenges">
						{timerChallengeArray.map(({ title, targetTime, highScore }) => (
							<TimerChallenge key={title} title={title} targetTime={targetTime} userId={userId} highScore={highScore} userName={userData?.username || 'Guest'} />
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
