
import { useState, useEffect } from "react"
import "./pomodoro-timer.css"

export function PomodoroTimer() {
    const [sessionType, setSessionType] = useState("focus")
    const [remainingSeconds, setRemainingSeconds] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false)

    const sessionDurations = {
        focus: 25 * 60,
        shortBreak: 10 * 60,
        longBreak: 15 * 60,
    }

    useEffect(() => {
        let interval

        if (isRunning && remainingSeconds > 0) {
            interval = setInterval(() => {
                setRemainingSeconds((prev) => prev - 1)
            }, 1000)
        } else if (remainingSeconds === 0 && isRunning) {
            setIsRunning(false)
        }

        return () => clearInterval(interval)
    }, [isRunning, remainingSeconds])

    const handleSessionChange = (type) => {
        setSessionType(type)
        setIsRunning(false)
        const duration = sessionDurations[type]
        setRemainingSeconds(duration)
    }

    const handleAddTime = (minutes) => {
        if (!isRunning) {
            const newSeconds = remainingSeconds + minutes * 60
            setRemainingSeconds(newSeconds)
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const toggleTimer = () => {
        setIsRunning(!isRunning)
    }


    const resetTimer = () => {
        setIsRunning(false)
        setRemainingSeconds(sessionDurations[sessionType])
    }

    const handleReset = () => {
        resetTimer()
    }   

    return (
        <div>
            {/* Top Icons Placeholder */}
            

            {/* Session Type Tabs */}
            <div className="flex gap-6 text-center">
                {["focus", "shortBreak", "longBreak"].map((type) => {
                    const labels = {
                        focus: "Focus",
                        shortBreak: "Short Break",
                        longBreak: "Long Break",
                    }



                    return (
                        <button
                            key={type}
                            onClick={() => handleSessionChange(type)}
                            className={`pomo-mode-tab ${sessionType === type ? "active" : ""}`}
                        >
                            {labels[type]}
                        </button>
                    )
                })}
            </div>



            {/* Timer Display */}
              <div className="flex gap-6 text-center">
                <div className="timer">{formatTime(remainingSeconds)}</div>
            </div>



            {/* Quick Add Buttons */}
              <div className="flex gap-6 text-center">
                {[25, 10, 5, 1].map((mins) => (
                    <button
                        key={mins}
                        onClick={() => handleAddTime(mins)}
                        disabled={isRunning}
                        className="btns"
                    >
                        + {mins} min
                    </button>
                ))}
            </div>

            {/* Start Button */}

            <div className="flex gap-6 text-center">
                <button onClick={toggleTimer} className="pomo-start-btn">
                    {isRunning ? "Pause" : "Start"}
                </button>

                <button onClick={handleReset} className="pomo-reset-btn">
                    Reset
                </button>
                
            </div>

            


            
        </div>
    )
}
