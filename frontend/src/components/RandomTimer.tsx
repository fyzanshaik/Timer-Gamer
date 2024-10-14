import { useEffect, useState } from 'react';

interface RandomTimerProps {
	targetTime: number; // Pass the target time as a prop
}

const RandomTimer: React.FC<RandomTimerProps> = ({ targetTime }) => {
	const [randNumber, setRandomNumber] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			let newRandomNumber;
			do {
				newRandomNumber = Math.round(Math.random() * targetTime); // Generate random number
			} while (newRandomNumber === 1); // Ensure it's not 1

			setRandomNumber(newRandomNumber);
		}, 100); // Update every 100 milliseconds

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, [targetTime]); // Only change if targetTime changes

	return (
		<h1>
			<em>{randNumber}</em>
		</h1>
	);
};

export default RandomTimer;
