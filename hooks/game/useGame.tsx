import {createContext, useContext, useState} from 'react'
import dayjs, {Dayjs} from 'dayjs'

const today = dayjs()

const useGame = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(today)

  const moveToYesterday = () => {
    setSelectedDate(selectedDate.subtract(1, 'day'))
  }

  const moveToTomorrow = () => {
    setSelectedDate(selectedDate.add(1, 'day'))
  }

  return {
    moveToYesterday,
    moveToTomorrow,
    selectedDate,
  }
}

interface IGameContext {
  moveToYesterday: () => void
  moveToTomorrow: () => void
  selectedDate: Dayjs
}

const GameContext = createContext<IGameContext | null>(null)

export const GameProvider = ({children}: {children: React.ReactNode}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(today)

  const moveToYesterday = () => {
    setSelectedDate(selectedDate.subtract(1, 'day'))
  }

  const moveToTomorrow = () => {
    setSelectedDate(selectedDate.add(1, 'day'))
  }

  return (
    <GameContext.Provider
      value={{
        moveToYesterday,
        moveToTomorrow,
        selectedDate,
      }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
