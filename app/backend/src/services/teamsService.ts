import Team from '../database/models/Team';

export default class TeamsService {
  static async getAll() {
    const teams = await Team.findAll();
    return { type: null, message: teams };
  }

  static async getById(id: number) {
    const team = await Team.findByPk(id);
    return { type: null, message: team };
  }
}
