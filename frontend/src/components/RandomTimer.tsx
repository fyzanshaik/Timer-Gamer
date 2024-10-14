import { useEffect, useState } from 'react';

interface RandomTimerProps {
	targetTime: number; // Pass the target time as a prop
}

const RandomTimer: React.FC<RandomTimerProps> = ({ targetTime }) => {
	const [randNumber, setRandomNumber] = useState<string>('0'); // Change initial state to string for formatting

	useEffect(() => {
		const interval = setInterval(() => {
			let newRandomNumber: number;

			do {
				newRandomNumber = Math.random() * targetTime; // Generate a random number in the range [0, targetTime]
			} while (newRandomNumber === 1); // Ensure it's not 1

			// Format number: if it's 1, show as a decimal; otherwise, round to nearest integer
			if (newRandomNumber === 1) {
				setRandomNumber(newRandomNumber.toFixed(2)); // Show as a decimal with 2 fixed places
			} else {
				setRandomNumber(Math.round(newRandomNumber).toString()); // Round and convert to string for display
			}
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
