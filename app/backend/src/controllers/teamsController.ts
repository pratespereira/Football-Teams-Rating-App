import { Request, Response } from 'express';
import teamsService from '../services/teamsService';

export default class TeamController {
  static async getAll(req: Request, res: Response) {
    const { type, message } = await teamsService.getAll();

    if (type) {
      return res.status(400).json({ message });
    }

    res.status(200).json(message);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await teamsService.getById(Number(id));

    if (type) {
      return res.status(400).json({ message });
    }

    res.status(200).json(message);
  }
}
