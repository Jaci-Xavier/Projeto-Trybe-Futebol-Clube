import { Request, Response, NextFunction } from 'express';
import autJwt from '../utils/auth.jwt';

const tokenVerify = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const tokenBearer = token.includes('Bearer') ? token.split(' ')[1] : token;

    const decoded = autJwt(tokenBearer);

    req.body.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenVerify;
