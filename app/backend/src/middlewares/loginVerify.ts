import { Request, Response, NextFunction } from 'express';

class LoginVerify {
  static verifyEmail(req: Request, res: Response, next: NextFunction): Response | void {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'All fields must be filled' });

    next();
  }

  static verifyPassword(req: Request, res: Response, next: NextFunction): Response | void {
    const { password } = req.body;

    if (!password) return res.status(400).json({ message: 'All fields must be filled' });

    next();
  }
}

export default LoginVerify;
