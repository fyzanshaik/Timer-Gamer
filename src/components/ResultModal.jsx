import { useRef } from "react"
import { forwardRef, useImperativeHandle } from "react"

export const ResultModal = forwardRef(({ targetTime, remainingTime, handleReset }, ref) => {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedTime = (remainingTime / 1000).toFixed(2);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })

    return <dialog className="result-modal " ref={dialog}>
        {userLost && <h2>You Lost</h2>}
        <p>The target time was <strong>{targetTime}</strong></p>
        <p>You stopped the timer with <strong>{formattedTime}'s left</strong></p>
        <form method="dialog" onSubmit={handleReset} >
            <button>Close</button>
        </form>

    </dialog>
})