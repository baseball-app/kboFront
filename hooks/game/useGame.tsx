import {createContext, useContext} from 'react'
import dayjs from 'dayjs'
import useMatch, {Match} from '../match/useMatch'
import useProfile from '../my/useProfile'

const today = dayjs()

interface IGameContext {
  matchingList: Match[]
  todayMyTeamMatch: Match | undefined
}

const GameContext = createContext<IGameContext | null>(null)

export const GameProvider = ({children}: {children: React.ReactNode}) => {
  const {matchingList} = useMatch({selectedDate: today.toDate()})
  const {profile} = useProfile()

  const todayMyTeamMatch = matchingList //
    .find(({team_away_info, team_home_info}) => {
      return team_away_info.id === profile.my_team?.id || team_home_info.id === profile.my_team?.id
    })

  return (
    <GameContext.Provider
      value={{
        matchingList,
        todayMyTeamMatch,
      }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
