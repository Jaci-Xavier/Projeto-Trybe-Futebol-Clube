import { Router } from 'express';
import LeaderboardController from '../controller/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/leaderboard/home',
  LeaderboardController.getLeaderboard,
);

export default leaderboardRouter;
