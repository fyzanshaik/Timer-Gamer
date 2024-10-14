import Player from './components/Player.js';
import TimerChallenge from './components/TimerChallenge.js';
import { Header } from './components/Header.js';
import { useState } from 'react';
import { UserData } from './interfaces.ts';

function App() {
	const [userData, setUserData] = useState<UserData | null>(null);

	const userScores = userData?.scores?.[0];
	const userId = userScores?.userId || 1;

	const timerChallengeArray = [
		{ title: 'Quick Reflex', targetTime: 1, highScore: userScores?.timer1Score ?? 0 },
		{ title: 'Speed Test', targetTime: 5, highScore: userScores?.timer5Score ?? 0 },
		{ title: 'Endurance', targetTime: 10, highScore: userScores?.timer10Score ?? 0 },
		{ title: 'Focus Mode', targetTime: 15, highScore: userScores?.timer15Score ?? 0 },
		{ title: 'Ultimate Challenge', targetTime: 30, highScore: userScores?.timer30Score ?? 0 },
	];

	console.log(userScores);

	return (
		<>
			<Header />
			<Player setUserData={setUserData} userData={userData} />

			<div id="challenges">
				{timerChallengeArray.map(({ title, targetTime, highScore }) => (
					<TimerChallenge key={title} title={title} targetTime={targetTime} userId={userId} highScore={highScore} />
				))}
			</div>
		</>
	);
}

export default App;
