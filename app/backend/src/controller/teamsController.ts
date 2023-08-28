import { Request, Response } from 'express';

import TeamsService from '../service/teamsService';

class TeamsController {
  static async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const teams = await TeamsService.getAllTeams();

    return res.status(200).json(teams);
  }
}

export default TeamsController;
