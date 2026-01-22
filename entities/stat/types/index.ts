export type WinPercentResponse = {
  win_percent: number;
};

export type WeekdayMostWinResponse = {
  most_wins_day: number | null;
};

export type LongestWinningStreakResponse = {
  longest_winning_streak: number;
};

export type MostWinTeamResponse = {
  most_wins_opponent: string;
};

export type BallparkMostViewResponse = {
  most_wins_ballpark: string;
};

export type WinRateRecord = {
  win_count: number;
  loss_count: number;
  draw_count: number;
  cancel_count: number;
};

export type WinRateCalculationResponse = Record<'is_ballpark_win_rate' | 'is_not_ballpark_win_rate', WinRateRecord>;

export type BallparkWinStat = {
  ballpark_id: number;
  ballpark_nm: string;
  total_games: number;
  wins: number;
  losses: number;
  draws: number;
  win_percent: number;
};

export type BallparkWinPercentByYearResponse = {
  by_user_ballpark_win_stat: BallparkWinStat[];
};

export type HomeAwayWinStat = {
  home_away: 'home' | 'away';
  is_cheer: 'true' | 'false';
  total_games: number;
  wins: number;
  losses: number;
  draws: number;
  win_percent: number;
};

export type HomeAwayWinPercentByYearResponse = {
  home_away_win_stat: HomeAwayWinStat[];
};

export type MyHomeWinStat = {
  team_id: number;
  team_nm: string;
  total_games: number;
  wins: number;
  losses: number;
  draws: number;
  win_percent: number;
};

export type NotBallparkWinPercentByYearResponse = {
  my_home_win_stat: MyHomeWinStat[];
};

export type OpponentWinStat = {
  opponent_id: number;
  team_nm: string;
  total_games: number;
  wins: number;
  losses: number;
  draws: number;
  win_percent: number;
};

export type OpponentWinPercentByYearResponse = {
  opponent_win_stat: OpponentWinStat[];
};

export type TotalWinStats = {
  total_percent: number;
  total_games: number;
  wins: number;
  losses: number;
  draws: number;
};

export type TotalWinPercentByYearResponse = {
  all_ticket_stats: TotalWinStats;
};
