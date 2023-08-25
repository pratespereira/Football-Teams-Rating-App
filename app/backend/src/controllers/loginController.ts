import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { type, message } = await UserService.login({ email, password });

    if (type) {
      return res.status(401).json({ message });
    }

    res.status(200).json({ token: message });
  }

  static async getRole(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const userRole = await UserService.getRole(token);
    return res.status(200).json(userRole);
  }
}
