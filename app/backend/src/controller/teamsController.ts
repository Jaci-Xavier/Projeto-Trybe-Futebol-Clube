import { Request, Response } from 'express';

import TeamsService from '../service/teamsService';

class TeamsController {
  static async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const teams = await TeamsService.getAllTeams();

    return res.status(200).json(teams);
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const team = await TeamsService.getById(id);

    return res.status(200).json(team);
  }
}

export default TeamsController;
