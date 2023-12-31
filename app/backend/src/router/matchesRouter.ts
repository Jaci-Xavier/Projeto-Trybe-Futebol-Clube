import { Router } from 'express';

import tokenVerify from '../middlewares/tokenVerify';
import matchesController from '../controller/matchesController';

const matchesRouter = Router();

matchesRouter.get(
  '/matches',

  matchesController.getAllMaches,
);

matchesRouter.post(
  '/matches',

  tokenVerify,

  matchesController.createMatch,
);

matchesRouter.patch(
  '/matches/:id/finish',

  tokenVerify,

  matchesController.finishMatch,
);

matchesRouter.patch(
  '/matches/:id',

  tokenVerify,

  matchesController.updateMatch,
);

export default matchesRouter;
