import { Router } from 'express';
import LoginVerify from '../middlewares/loginVerify';

import loginController from '../controller/loginController';

const loginRouter = Router();

loginRouter.post(
  '/login',
  LoginVerify.verifyEmail,

  LoginVerify.verifyPassword,

  loginController.login,
);

export default loginRouter;
