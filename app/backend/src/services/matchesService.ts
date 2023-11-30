import { IUpdateMatch } from '../interfaces/IUpdateMatch';
import { ISimpleMatch, ISimpleMatchInProgess } from '../interfaces/ISimpleMatch';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import IMatches from '../interfaces/IMatches';

export default class MatchesService {
  static async getMatches(query: string): Promise<IMatches[]> {
    const matches = await Match.findAll({
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: Team,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    if (query === 'true') {
      return matches.filter(({ inProgress }) => inProgress) as IMatches[];
    }
    if (query === 'false') {
      return matches.filter(({ inProgress }) => !inProgress) as IMatches[];
    }
    return matches as IMatches[];
  }

  static async createMatch({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }: ISimpleMatch) {
    if (homeTeamId === awayTeamId) {
      return { type: 422, message: 'It is not possible to create a match with two equal teams' };
    }

    const team1 = await Team.findByPk(homeTeamId);
    const team2 = await Team.findByPk(awayTeamId);

    if (!team1 || !team2) {
      return { type: 404, message: 'There is no team with such id!' };
    }

    const newMatch = await Match.create({ homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true });
    return { type: null, message: newMatch.dataValues as ISimpleMatchInProgess };
  }

  static async finishMatch(id: number) {
    const updateToFinish = await Match.update({ inProgress: false }, { where: { id } });
    if (updateToFinish[0] === 0) {
      return { type: 404, message: 'There is no match with such id!' };
    }
    return { type: null, message: 'Finished' };
  }

  static async updateMatch(id: number, { homeTeamGoals, awayTeamGoals }: IUpdateMatch) {
    const updateMatch = await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    if (updateMatch[0] === 0) {
      return { type: 404, message: 'There is no match with such id!' };
    }
    return { type: null, message: 'Updated' };
  }
}
