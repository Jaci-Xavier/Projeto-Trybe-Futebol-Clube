import { Router } from 'express';

import matchesController from '../controller/matchesController';

const matchesRouter = Router();

matchesRouter.get(
  '/matches',

  matchesController.getAllMaches,
);

export default matchesRouter;
