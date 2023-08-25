import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/', LeaderboardController.getOverallLeaderboard);
leaderboardRouter.get('/home', LeaderboardController.getHomeLeaderboard);
leaderboardRouter.get('/away', LeaderboardController.getAwayLeaderboard);

export default leaderboardRouter;
