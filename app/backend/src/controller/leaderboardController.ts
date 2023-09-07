import { Request, Response } from 'express';

import leaderboardService from '../service/leaderboardService';

class LeaderboardController {
  static async getHomeLeaderboard(req: Request, res: Response) {
    const leaderboard = await leaderboardService.getHomeLeaderboard();
    res.status(200).json(leaderboard);
  }

  static async getAwayLeaderboard(req: Request, res: Response) {
    const leaderboard = await leaderboardService.getAwayLeaderboard();
    res.status(200).json(leaderboard);
  }

  static async getAllLeaderboard(req: Request, res: Response) {
    const leaderboard = await leaderboardService.getAllLeaderboard();
    res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
