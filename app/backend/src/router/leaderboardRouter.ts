import { Router } from 'express';
import LeaderboardController from '../controller/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/leaderboard/home',
  LeaderboardController.getHomeLeaderboard,
);

leaderboardRouter.get(
  '/leaderboard/away',
  LeaderboardController.getAwayLeaderboard,
);

leaderboardRouter.get(
  '/leaderboard',
  LeaderboardController.getAllLeaderboard,
);

export default leaderboardRouter;
