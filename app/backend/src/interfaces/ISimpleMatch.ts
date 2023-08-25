export interface ISimpleMatch {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface ISimpleMatchInProgess extends ISimpleMatch {
  inProgress: boolean;
}
