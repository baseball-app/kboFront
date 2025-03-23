import {GameProvider} from '@/hooks/game/useGame'
import React from 'react'
import GameCardController from '../home/GameCardController'
import GameInfoCard from '../home/GameInfoCard'

const GameContainer = ({selectedUserName}: {selectedUserName: string}) => {
  return (
    <GameProvider>
      <GameCardController selectedUserName={selectedUserName} />
      <GameInfoCard />
    </GameProvider>
  )
}

export default GameContainer
