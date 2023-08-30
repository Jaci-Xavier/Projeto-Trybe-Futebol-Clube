import { Router } from 'express';

import tokenVerify from '../middlewares/tokenVerify';
import matchesController from '../controller/matchesController';

const matchesRouter = Router();

matchesRouter.get(
  '/matches',

  matchesController.getAllMaches,
);

matchesRouter.patch(
  '/matches/:id/finish',

  tokenVerify,

  matchesController.finishMatch,
);

export default matchesRouter;
