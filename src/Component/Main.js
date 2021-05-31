import React, { useState, useEffect } from 'react'

const Main = () => {
    const timerValues = [
        {
            name: 'Pomodoro',
            value: 25,
        },
        {
            name: 'Short Break',
            value: 5,
        },
        {
            name: 'Long Break',
            value: 10,
        },
    ]

    const DEFAULTMINUTES = 25
    const [countdownMinutes, setCountdownMinutes] = useState(DEFAULTMINUTES)
    const [countdownSeconds, setCountdownSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [initialTime, setInitialTime] = useState(DEFAULTMINUTES)
    const [initialMinutes, setInitialMinutes] = useState(DEFAULTMINUTES)

    let time = initialTime * 60

    useEffect(() => {
        if (!isRunning) {
            return
        }
        const interval = setInterval(() => {
            if (time < 0) {
                clearInterval(interval)
                return
            }
            setInitialTime(time / 60)
            setCountdownMinutes(Math.floor(time / 60))
            setCountdownSeconds(time % 60)
            time--
        }, 1000)
        return () => clearInterval(interval)
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
        setCountdownMinutes(initialMinutes)
        setCountdownSeconds(0)
        setInitialTime(initialMinutes)
    }

    const display = (value) => {
        if (value >= 0 && value <= 9) {
            return '0' + value
        } else {
            return '' + value
        }
    }

    return (
        <div>
            <div className='stopwatch'>
                {timerValues.map((timerValue, index) => (
                    <button onClick={() => changeTimer(timerValue.value)} key={index}>
                        {timerValue.name}
                    </button>
                ))}
            </div>
            <div className='stopwatch'>
                <h1>
                    {display(countdownMinutes)}:{display(countdownSeconds)}
                </h1>
                <button onClick={() => setIsRunning(true)}>Start</button>
                <button onClick={() => setIsRunning(false)}>Stop</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}

export default Main
