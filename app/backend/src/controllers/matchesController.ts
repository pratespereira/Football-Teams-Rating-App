import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import matchesService from '../services/matchesService';
// import { checkToken } from '../validations/loginValidations';

dotenv.config();

export default class MatchesController {
  static async getMatches(req: Request, res: Response) {
    const { inProgress = 'all' } = req.query;
    const matches = await matchesService.getMatches(inProgress as string);
    res.send(matches);
  }

  static async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await matchesService.createMatch({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    });
    if (match.type) {
      return res.status(match.type).json({ message: match.message });
    }
    return res.status(201).json(match.message);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const match = await matchesService.finishMatch(+id);
    if (match.type) {
      return res.status(match.type).json(match.message);
    }
    return res.status(200).json(match.message);
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match = await matchesService.updateMatch(+id, {
      homeTeamGoals,
      awayTeamGoals,
    });
    if (match.type) {
      return res.status(match.type).json(match.message);
    }
    return res.status(200).json(match.message);
  }
}
