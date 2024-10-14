import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';

interface LeaderboardProps {
	timerKey: string;
	highScore: number;
}

interface LeaderboardData {
	user: { username: string };
	[key: `${string}Score`]: number; // Allow dynamic keys like 'timer1Score', 'timer5Score', etc.
}

export interface LeaderboardHandle {
	open: () => void;
}

const Leaderboard = forwardRef<LeaderboardHandle, LeaderboardProps>(({ timerKey, highScore }, ref) => {
	const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	console.log(leaderboardData);
	useImperativeHandle(ref, () => ({
		open() {
			dialogRef.current?.showModal();
		},
	}));

	useEffect(() => {
		const fetchLeaderboard = async () => {
			try {
				const response = await fetch(`https://timer-gamer-1.onrender.com/api/users/leaderboard/${timerKey}Score`);
				const data = await response.json();
				setLeaderboardData(data);
			} catch (error) {
				console.error('Error fetching leaderboard data:', error);
			}
		};

		fetchLeaderboard();
	}, [timerKey, highScore]);

	return (
		<dialog ref={dialogRef} className="leaderboard-dialog">
			<h2>Leaderboard for {timerKey.replace('timer', 'Timer ')} Challenge</h2>
			<table>
				<thead>
					<tr>
						<th>Username</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					{leaderboardData.map((entry, index) => (
						<tr key={index}>
							<td>{entry.user['username']}</td>
							<td>{entry[`${timerKey}Score`]}</td>
						</tr>
					))}
				</tbody>
			</table>
			<form method="dialog">
				<button>Close</button>
			</form>
		</dialog>
	);
});

export default Leaderboard;
