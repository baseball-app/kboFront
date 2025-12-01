type Team = {
  id: number
  logo_url: string
  name: string
  short_name?: string
}

type TeamWithInfo = Omit<Team, 'logo_url'> & {
  logo: any // image에 들어갈 것
  color: string
}

type TeamInfo = {
  id: number
  name: string
  logo_url: string
}

type Match = {
  id: number
  team_home_info: TeamInfo
  team_away_info: TeamInfo
  ballpark_info: {
    id: number
    name: string
    team_info: TeamInfo
  }
  game_date: string //'2025-02-16T08:27:20.308Z'
  score_home?: number
  score_away?: number
  is_finished?: boolean
}

export type {Team, TeamWithInfo, Match}
