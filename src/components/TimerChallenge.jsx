import { useRef } from "react";
import { useState } from "react"
import { ResultModal } from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

    const timerRef = useRef();
    const dialog = useRef();

    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

    if (remainingTime <= 0) {
        clearInterval(timerRef.current)
        dialog.current.open()
    }

    const handleStart = () => {

        timerRef.current = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 10);
        }, 10)
    }

    const handleStop = () => {
        clearTimeout(timerRef.current);
        setRemainingTime((prevState) => { return !prevState });
        dialog.current.open()
    }

    const handleReset = () => {
        setRemainingTime(targetTime * 1000)
    }

    return (<>
        <ResultModal ref={dialog} result={"lost"} targetTime={targetTime} remainingTime={remainingTime} handleReset={handleReset} />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart} >
                    {timerIsActive ? "Stop the timer" : "Start the timer"}
                </button>
            </p>
            <p className={timerIsActive ? 'active' : null}>
                {timerIsActive ? "Timer is running" : "Timer is inactive"}
            </p>
        </section>
    </>
    )
}

export default TimerChallenge