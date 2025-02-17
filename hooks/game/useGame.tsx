import {createContext, useContext, useState} from 'react'
import dayjs, {Dayjs} from 'dayjs'
import useTicket from '../match/useTicket'
import useMatch, {Match} from '../match/useMatch'

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
  matchingList: Match[]
}

const GameContext = createContext<IGameContext | null>(null)

export const GameProvider = ({children}: {children: React.ReactNode}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(today)
  const {matchingList} = useMatch({selectedDate: selectedDate.toDate()})

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
        matchingList,
      }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
