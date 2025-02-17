import {GameProvider} from '@/hooks/game/useGame'
import React from 'react'
import GameCardController from '../home/GameCardController'
import GameInfoCard from '../home/GameInfoCard'

const GameContainer = () => {
  return (
    <GameProvider>
      <GameCardController />
      <GameInfoCard />
    </GameProvider>
  )
}

export default GameContainer
