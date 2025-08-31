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

export type {Team, TeamWithInfo}
