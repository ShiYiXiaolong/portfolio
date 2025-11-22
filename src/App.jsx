import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [timerText, setTimerText] = useState('')

  useEffect(() => {
    const startDate = new Date.now()
    const endDate = new Date('2025-12-31T23:59:59')

    function updateTimer() {
      const now = new Date()
      if (now < startDate) {
        setTimerText('Countdown starts on June 10, 2025.')
        return
      }
      if (now > endDate) {
        setTimerText('The construction period has ended.')
        return
      }
      const diff = endDate - now
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / 1000 / 60) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setTimerText(`Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container">
      <div className="nero-box">
        <div className="nero-name">NERO<br />LIU</div>
      </div>
      <div className="under-construction">CURRENTLY UNDER CONSTRUCTION</div>
      {/* <div id="timer" className="timer">{timerText}</div> */}
    </div>
  )
}

export default App

