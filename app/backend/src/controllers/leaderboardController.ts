import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import ILeaderboard from '../interfaces/ILeaderboard';

const getFinalScore = (team: ILeaderboard[]) => team.sort((a, b) => {
  if (b.totalPoints - a.totalPoints !== 0) return b.totalPoints - a.totalPoints;
  if (b.totalVictories - a.totalVictories !== 0) return b.totalVictories - a.totalVictories;
  if (b.goalsBalance - a.goalsBalance !== 0) return b.goalsBalance - a.goalsBalance;
  return b.goalsFavor - a.goalsFavor;
});

export default class LeaderboardController {
  static async getHomeLeaderboard(req: Request, res: Response) {
    const leaderboard = await LeaderboardService.homeLeaderboard();
    const final = getFinalScore(leaderboard);
    res.status(200).json(final);
  }

  static async getAwayLeaderboard(req: Request, res: Response) {
    const leaderboard = await LeaderboardService.awayLeaderboard();
    const final = getFinalScore(leaderboard);
    res.status(200).json(final);
  }

  static async getOverallLeaderboard(req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getLeaderboard();
    const final = getFinalScore(leaderboard);
    res.status(200).json(final);
  }
}
