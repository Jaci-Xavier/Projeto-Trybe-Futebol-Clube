import { Router } from 'express';
import LoginVerify from '../middlewares/loginVerify';

import loginController from '../controller/loginController';
import tokenVerify from '../middlewares/tokenVerify';

const loginRouter = Router();

loginRouter.post(
  '/login',
  LoginVerify.verifyEmail,

  LoginVerify.verifyPassword,

  loginController.login,
);

loginRouter.get(
  '/login/role',

  tokenVerify,

  loginController.role,
);

export default loginRouter;
