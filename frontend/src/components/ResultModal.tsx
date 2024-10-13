import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

interface ResultModalProps {
	targetTime: number;
	remainingTime: number;
	handleReset: () => void;
}

export interface ResultModalHandle {
	open: () => void;
}

export const ResultModal = forwardRef<ResultModalHandle, ResultModalProps>(({ targetTime, remainingTime, handleReset }, ref) => {
	const dialog = useRef<HTMLDialogElement | null>(null);

	const userLost = remainingTime <= 0;
	const formattedTime = (remainingTime / 1000).toFixed(2);
	const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

	useImperativeHandle(ref, () => ({
		open() {
			dialog.current?.showModal();
		},
	}));

	return createPortal(
		<dialog className="result-modal" ref={dialog} onClose={handleReset}>
			{userLost && <h2>You Lost</h2>}
			{!userLost && <h2>Your score: {score}</h2>}
			<p>
				The target time was <strong>{targetTime}</strong>
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
