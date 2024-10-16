import { useState, forwardRef, useImperativeHandle, useRef } from 'react';

interface LeaderboardProps {
	timerKey: string;
}

interface LeaderboardData {
	user: { username: string };
	[key: `${string}Score`]: number;
}

export interface LeaderboardHandle {
	fetchAndOpen: () => void;
}
// const apiURL = 'http://localhost:8080/api/users';
const apiURL = 'https://timer-gamer-1.onrender.com/api/users';
const Leaderboard = forwardRef<LeaderboardHandle, LeaderboardProps>(({ timerKey }, ref) => {
	const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const dialogRef = useRef<HTMLDialogElement | null>(null);
	console.log(leaderboardData);
	useImperativeHandle(ref, () => ({
		async fetchAndOpen() {
			setIsLoading(true);
			try {
				const response = await fetch(`${apiURL}/leaderboard/${timerKey}Score`);
				const data = await response.json();
				setLeaderboardData(data);
			} catch (error) {
				console.error('Error fetching leaderboard data:', error);
			}
			setIsLoading(false);
			dialogRef.current?.showModal();
		},
	}));

	return (
		<dialog ref={dialogRef} className="leaderboard-dialog">
			<h2>Leaderboard for {timerKey.replace('timer', 'Timer ')} Challenge</h2>
			{isLoading ? (
				<div className="loading-skeleton-container">
					<div className="skeleton-row">
						<div className="skeleton skeleton-username"></div>
						<div className="skeleton skeleton-score"></div>
					</div>
					<div className="skeleton-row">
						<div className="skeleton skeleton-username"></div>
						<div className="skeleton skeleton-score"></div>
					</div>
					<div className="skeleton-row">
						<div className="skeleton skeleton-username"></div>
						<div className="skeleton skeleton-score"></div>
					</div>
					<div className="skeleton-row">
						<div className="skeleton skeleton-username"></div>
						<div className="skeleton skeleton-score"></div>
					</div>
				</div>
			) : (
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
			)}

			<form method="dialog">
				<button>Close</button>
			</form>
		</dialog>
	);
});

export default Leaderboard;
