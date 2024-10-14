import { useRef, useState, useCallback, useEffect } from 'react';
import { ResultModal } from './ResultModal';
import { TimerChallengeProps } from '../interfaces';
import Leaderboard, { LeaderboardHandle } from './Leaderboard';

const TimerChallenge: React.FC<TimerChallengeProps> = ({ title, targetTime, highScore, userId }) => {
	const [remainingTime, setRemainingTime] = useState<number>(targetTime * 1000);
	const [userHighscore, setUserHighscore] = useState<number>(highScore);

	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const dialog = useRef<{ open: () => void }>(null);
	const leaderDialog = useRef<LeaderboardHandle>(null);

	const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

	useEffect(() => {
		if (remainingTime <= 0 && timerRef.current) {
			clearInterval(timerRef.current);
			dialog.current?.open();
		}
	}, [remainingTime]);

	useEffect(() => {
		return () => clearInterval(timerRef.current!);
	}, []);

	const handleStart = useCallback(() => {
		if (!timerIsActive) {
			timerRef.current = setInterval(() => {
				setRemainingTime((prevRemainingTime) => Math.max(prevRemainingTime - 10, 0));
			}, 10);
		}
	}, [timerIsActive]);

	const handleStop = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			dialog.current?.open();
		}
	}, []);

	const handleReset = useCallback(() => {
		setRemainingTime(targetTime * 1000);
	}, [targetTime]);

	const openLeaderboard = () => {
		leaderDialog.current?.fetchAndOpen();
	};

	return (
		<>
			<ResultModal ref={dialog} userId={userId} targetTime={targetTime} remainingTime={remainingTime} handleReset={handleReset} setUserHighScore={setUserHighscore} userHighScore={userHighscore} />
			{userId == 1 ? null : <Leaderboard ref={leaderDialog} timerKey={`timer${targetTime}`} />}
			<section className="challenge">
				<h2>{title}</h2>
				<p>
					<strong>Your highscore: {userHighscore > highScore ? userHighscore : highScore}</strong>
				</p>
				<p className="challenge-time">
					{targetTime} second{targetTime > 1 ? 's' : ''}
				</p>
				<p>
					<button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop the timer' : 'Start the timer'}</button>
				</p>
				<p className={timerIsActive ? 'active' : ''}>{timerIsActive ? 'Timer is running' : 'Timer is inactive'}</p>
				<p>
					<button onClick={openLeaderboard}>View Leaderboard</button>
				</p>
			</section>
		</>
	);
};

export default TimerChallenge;
