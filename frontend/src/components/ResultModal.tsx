import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { ResultModalProps } from '../interfaces';

export interface ResultModalHandle {
	open: () => void;
}

const apiURL = 'http://localhost:8080/api/users';

export const ResultModal = forwardRef<ResultModalHandle, ResultModalProps>(({ targetTime, remainingTime, handleReset, userId, setUserHighScore, userHighScore }, ref) => {
	const dialog = useRef<HTMLDialogElement | null>(null);

	const userLost = remainingTime <= 0;
	const formattedTime = (remainingTime / 1000).toFixed(2);
	const formattedTime8base = (remainingTime / 1000).toFixed(5);

	const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

	useImperativeHandle(ref, () => ({
		open() {
			dialog.current?.showModal();
			updateScore();
		},
	}));

	const updateScore = async () => {
		if (score > userHighScore && !userLost) {
			setUserHighScore(score);
			try {
				const response = await fetch(`${apiURL}/updateScore`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						userId: userId,
						timerName: `timer${targetTime}Score`,
						newScore: score,
					}),
				});

				if (response.ok) {
					const data = await response.json();
					console.log('Score updated successfully:', data);
				} else {
					console.error('Failed to update the score:', response.statusText);
				}
			} catch (error) {
				console.error('Error updating score:', error);
			}
		}
	};

	return createPortal(
		<dialog className="result-modal" ref={dialog} onClose={handleReset}>
			{userLost && <h2>You Lost</h2>}
			{!userLost && <h2>Your score: {score}</h2>}
			<p>
				The target time was <strong>{targetTime}</strong>
			</p>
			<p>
				8base: <strong>{formattedTime8base}ms</strong>{' '}
			</p>
			<p>
				You stopped the timer with <strong>{formattedTime}ms left</strong>
			</p>
			<form method="dialog" onSubmit={handleReset}>
				<button>Close</button>
			</form>
		</dialog>,
		document.getElementById('modal') as HTMLElement
	);
});
