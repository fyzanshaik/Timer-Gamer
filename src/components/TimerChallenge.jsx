import { useRef } from "react";
import { useState } from "react"

const TimerChallenge = ({ title, targetTime }) => {
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpiration] = useState(false);
    let timerRef = useRef();
    const handleStart = () => {
        setTimerStarted(true);
        setTimerExpiration(false);
        console.log("Timer has started", timerExpired)
        timerRef.current = setTimeout(() => {
            setTimerExpiration(true);
            setTimerStarted(false);
        }, targetTime * 1000)
    }

    const handleStop = () => {
        console.log("Timer is being stopped ", timerExpired)
        clearTimeout(timerRef.current);
        setTimerStarted((prevState) => { return !prevState });
        console.log("Timer is being stopped2 ", timerExpired)

    }

    return <section className="challenge">
        <h2>{title}</h2>
        {timerExpired ? <p>You lost</p> : null}
        <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
            <button onClick={timerStarted ? handleStop : handleStart} >
                {timerStarted ? "Stop the timer" : "Start the timer"}
            </button>
        </p>
        <p className={timerStarted ? 'active' : null}>
            {timerStarted ? "Timer is running" : "Timer is inactive"}
        </p>
    </section>
}

export default TimerChallenge