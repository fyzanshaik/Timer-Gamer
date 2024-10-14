import { useEffect, useState } from 'react';

interface RandomTimerProps {
	targetTime: number;
}

const RandomTimer: React.FC<RandomTimerProps> = ({ targetTime }) => {
	const [randNumber, setRandomNumber] = useState<string>('0');

	useEffect(() => {
		const interval = setInterval(() => {
			let newRandomNumber: number;

			do {
				newRandomNumber = Math.random() * targetTime;
			} while (newRandomNumber === 1);

			if (newRandomNumber === 1) {
				setRandomNumber(newRandomNumber.toFixed(2));
			} else {
				setRandomNumber(Math.round(newRandomNumber).toString());
			}
		}, 100);

		return () => clearInterval(interval);
	}, [targetTime]);

	return (
		<div id="timer">
			<h1>
				<em>{randNumber}</em>
			</h1>
		</div>
	);
};

export default RandomTimer;
