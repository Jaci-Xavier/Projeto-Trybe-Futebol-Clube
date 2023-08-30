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
}

export default MatchesController;
