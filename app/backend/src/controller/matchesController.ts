import { Request, Response } from 'express';

import matchesService from '../service/matchesService';

class MatchesController {
  static async getAllMaches(req: Request, res: Response): Promise<Response> {
    if (req.query.inProgress) {
      const matches = await matchesService.getMatchByProgress(req.query.inProgress as string);

      return res.status(200).json(matches);
    }
    const matches = await matchesService.getAllMaches();

    return res.status(200).json(matches);
  }

  static async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const match = await matchesService.finishMatch(id);

    return res.status(200).json(match);
  }

  static async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match = await matchesService.updateMatch(id, homeTeamGoals, awayTeamGoals);

    return res.status(200).json(match);
  }
}

export default MatchesController;
