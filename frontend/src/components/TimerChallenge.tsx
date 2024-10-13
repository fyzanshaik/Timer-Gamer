import { useRef, useState } from 'react';
import { ResultModal } from './ResultModal';

// Define the props interface for TimerChallenge
interface TimerChallengeProps {
	title: string;
	targetTime: number;
}

const TimerChallenge: React.FC<TimerChallengeProps> = ({ title, targetTime }) => {
	const [remainingTime, setRemainingTime] = useState<number>(targetTime * 1000);

	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const dialog = useRef<{ open: () => void }>(null);

	const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

	if (remainingTime <= 0) {
		clearInterval(timerRef.current!); // Using non-null assertion as it's safe to assume it exists
		dialog.current?.open();
	}

	const handleStart = () => {
		timerRef.current = setInterval(() => {
			setRemainingTime((prevRemainingTime) => Math.max(prevRemainingTime - 10, 0));
		}, 10);
	};

	const handleStop = () => {
		clearInterval(timerRef.current!); // Non-null assertion here as well
		dialog.current?.open();
	};

	const handleReset = () => {
		setRemainingTime(targetTime * 1000);
	};

	return (
		<>
			<ResultModal ref={dialog} targetTime={targetTime} remainingTime={remainingTime} handleReset={handleReset} />
			<section className="challenge">
				<h2>{title}</h2>
				<p className="challenge-time">
					{targetTime} second{targetTime > 1 ? 's' : ''}
				</p>
				<p>
					<button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop the timer' : 'Start the timer'}</button>
				</p>
				<p className={timerIsActive ? 'active' : ''}>{timerIsActive ? 'Timer is running' : 'Timer is inactive'}</p>
			</section>
		</>
	);
};

export default TimerChallenge;
