import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const emailAndPasswordValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.decoded = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export { emailAndPasswordValidator, tokenValidator };
