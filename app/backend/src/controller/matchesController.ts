import { Request, Response } from 'express';

import matchesService from '../service/matchesService';

class MatchesController {
  static async getAllMaches(_req: Request, res: Response): Promise<Response> {
    const matches = await matchesService.getAllMaches();

    return res.status(200).json(matches);
  }
}

export default MatchesController;
