import { useEffect, useState } from "react"
import { isNil } from "lodash"

export const useOtpTimer = (codeEndTime?: string) => {
  const countDownDate = !isNil(codeEndTime) ? new Date(codeEndTime).getTime() : undefined;
  const now = new Date().getTime();
  const timeLeft = !isNil(countDownDate) ? countDownDate - now : undefined;
  const minutesLeft = !isNil(timeLeft) ? Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)) : 3;
  const secondsLeft = !isNil(timeLeft) ? Math.floor((timeLeft % (1000 * 60)) / 1000) : 59;
  const [seconds, setSeconds] = useState(secondsLeft)
  const [minutes, setMinutes] = useState(minutesLeft)

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000)
    }

    if (seconds === 0) {
      setMinutes(prev => prev - 1)
      if(minutes > 0) {
        setSeconds(59)
      }
    }

  }, [seconds, minutes])

  const resetTimer = () => {
    setSeconds(59)
    setMinutes(4)
  }

  return {
    seconds,
    minutes,
    resetTimer,
  }
}
