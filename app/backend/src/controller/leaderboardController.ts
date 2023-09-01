import { Request, Response } from 'express';

import leaderboardService from '../service/leaderboardService';

class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response) {
    const leaderboard = await leaderboardService.getLeaderboard();
    res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
