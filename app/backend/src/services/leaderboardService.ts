import Team from '../database/models/Team';
import Match from '../database/models/Match';
import {
  homePoints,
  awayPoints,
  drawPoints,
  homeWins,
  awayWins,
  homeGoals,
  awayGoals,
} from '../helpers/leaderboardHelper';

export default class LeaderboardService {
  static async getHomeMatchById(id: number) {
    const matches = await Match.findAll({
      where: {
        homeTeamId: id,
        inProgress: false,
      },
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });
    return matches;
  }

  static async getAwayMatchById(id: number) {
    const matches = await Match.findAll({
      where: {
        awayTeamId: id,
        inProgress: false,
      },
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });
    return matches;
  }

  static async getHomeTeams() {
    const teams = await Team.findAll();
    const team = teams.map((t) => this.getHomeMatchById(t.id));
    const matches = await Promise.all(team);
    return matches;
  }

  static async getAwayTeams() {
    const teams = await Team.findAll();
    const team = teams.map((t) => this.getAwayMatchById(t.id));
    const matches = await Promise.all(team);
    return matches;
  }

  static async homeLeaderboard() {
    const teams = await Team.findAll();
    const team = await this.getHomeTeams();
    const reduce = team.map((acc, curr) => ({
      name: teams[curr].teamName,
      totalPoints: acc.reduce(homePoints, 0),
      totalGames: acc.length,
      totalVictories: acc.reduce(homeWins, 0),
      totalDraws: acc.reduce(drawPoints, 0),
      totalLosses:
        acc.length - acc.reduce(homeWins, 0) - acc.reduce(drawPoints, 0),
      goalsFavor: acc.reduce(homeGoals, 0),
      goalsOwn: acc.reduce(awayGoals, 0),
      goalsBalance: acc.reduce(homeGoals, 0) - acc.reduce(awayGoals, 0),
      efficiency: (acc.reduce(homePoints, 0) / (acc.length * 3)) * 100,
    }));
    return reduce;
  }

  static async awayLeaderboard() {
    const teams = await Team.findAll();
    const team = await this.getAwayTeams();
    const reduce = team.map((acc, curr) => ({
      name: teams[curr].teamName,
      totalPoints: acc.reduce(awayPoints, 0),
      totalGames: acc.length,
      totalVictories: acc.reduce(awayWins, 0),
      totalDraws: acc.reduce(drawPoints, 0),
      totalLosses:
        acc.length - acc.reduce(awayWins, 0) - acc.reduce(drawPoints, 0),
      goalsFavor: acc.reduce(awayGoals, 0),
      goalsOwn: acc.reduce(homeGoals, 0),
      goalsBalance: acc.reduce(awayGoals, 0) - acc.reduce(homeGoals, 0),
      efficiency: (acc.reduce(awayPoints, 0) / (acc.length * 3)) * 100,
    }));
    return reduce;
  }

  static async getLeaderboard() {
    const home = await this.homeLeaderboard();
    const away = await this.awayLeaderboard();
    const sum = home.map((acc, curr) => ({
      name: acc.name,
      totalPoints: acc.totalPoints + away[curr].totalPoints,
      totalGames: acc.totalGames + away[curr].totalGames,
      totalVictories: acc.totalVictories + away[curr].totalVictories,
      totalDraws: acc.totalDraws + away[curr].totalDraws,
      totalLosses: acc.totalLosses + away[curr].totalLosses,
      goalsFavor: acc.goalsFavor + away[curr].goalsFavor,
      goalsOwn: acc.goalsOwn + away[curr].goalsOwn,
    }));
    return sum.map((acc) => ({
      ...acc,
      goalsBalance: acc.goalsFavor - acc.goalsOwn,
      efficiency: (acc.totalPoints / (acc.totalGames * 3)) * 100,
    }));
  }
}
