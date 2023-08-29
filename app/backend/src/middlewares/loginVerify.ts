import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

class LoginVerify {
  static verifyEmail(req: Request, res: Response, next: NextFunction): Response | void {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'All fields must be filled' });

    if (!validator.isEmail(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static verifyPassword(req: Request, res: Response, next: NextFunction): Response | void {
    const { password } = req.body;

    if (!password) return res.status(400).json({ message: 'All fields must be filled' });

    if (!validator.isLength(password, { min: 6 })) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}

export default LoginVerify;
