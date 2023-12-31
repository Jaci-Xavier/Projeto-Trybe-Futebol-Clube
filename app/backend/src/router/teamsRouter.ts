import { Router } from 'express';

import TeamsController from '../controller/teamsController';

const teamsRouter = Router();

teamsRouter.get('/teams', TeamsController.getAllTeams);
teamsRouter.get('/teams/:id', TeamsController.getById);

export default teamsRouter;
