import { Request, Response } from 'express';

import loginService from '../service/loginService';

class TeamsController {
  static async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const userToken = await loginService.login(email, password);

    if (userToken.message) return res.status(401).json(userToken);

    return res.status(200).json(userToken);
  }

  static async role(req: Request, res: Response): Promise<Response> {
    const { email } = req.body.user;
    const userRole = await loginService.role(email);

    return res.status(200).json(userRole);
  }
}

export default TeamsController;
