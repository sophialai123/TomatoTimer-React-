import React, { useState, useEffect } from 'react'
 
const Main = () => {
    const defaultMinutes = 25
    const [countdownMinutes, setCountdownMinutes] = useState(defaultMinutes)
    const [countdownSeconds, setCountdownSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [initialTime, setInitialTime] = useState(defaultMinutes)
    const [initialMinutes, setInitialMinutes] = useState(defaultMinutes)

    let time = initialTime * 60
    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                if (time >= 0) {
                    setInitialTime(time / 60)
                    setCountdownMinutes(Math.floor(time / 60))
                    setCountdownSeconds(time % 60)
                    time--
                } else {
                    clearInterval(interval)
                }

            }, 1000);
            return () => clearInterval(interval)
        }
    }, [isRunning])

    const changeTimer = (startingMinutes) => {
        setIsRunning(false)
        setCountdownMinutes(startingMinutes)
        setCountdownSeconds(0)
        setInitialMinutes(startingMinutes)
        setInitialTime(startingMinutes)
    }

    const handleReset = () => {
        setIsRunning(false)
        setCountdownMinutes(initialMinutes);
        setCountdownSeconds(0);
        setInitialTime(initialMinutes)
    }

    const display = (value) => {
        if (value >= 0 && value <= 9) {
            return "0" + value
        } else {
            return '' + value
        }
    }

    return (
        <div>
            <div className="stopwatch">
                <button onClick={() => changeTimer(25)}>Pomodoro</button>
                <button onClick={() => changeTimer(5)}>Short Break</button>
                <button onClick={() => changeTimer(10)}>Long Break</button>
            </div>
            <div className="stopwatch">
                <h1>{display(countdownMinutes)}:{display(countdownSeconds)}</h1>
                <button onClick={() => setIsRunning(true)}>Start</button>
                <button onClick={() => setIsRunning(false)}>Stop</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}

export default Main
