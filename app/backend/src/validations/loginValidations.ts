import * as dotenv from 'dotenv';
import * as JWT from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import IUserXPass from '../interfaces/IUserXPass';
import IUser from '../interfaces/IUser';

dotenv.config();

const tokenCreate = (user: IUserXPass) => {
  const token = JWT.sign({ user }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
    algorithm: 'HS256',
  });
  return token;
};

const checkPassword = (password: string, user: IUser) => {
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return { type: 401, message: 'Incorrect email or password' };
  }
  return { type: null, message: passwordMatch };
};

const checkToken = (token: string) => {
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET || 'secret');
    return { type: null, message: decoded as IUserXPass };
  } catch (err) {
    return { type: 401, message: 'Expired or invalid token' };
  }
};

export { tokenCreate, checkPassword, checkToken };
