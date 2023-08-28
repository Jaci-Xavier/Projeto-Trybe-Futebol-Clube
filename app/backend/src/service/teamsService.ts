import TeamModel from '../database/models/TeamModel';

class TeamsService {
  static async getAllTeams() {
    const teams = await TeamModel.findAll();

    return teams;
  }

  static async getById(id: string) {
    const team = await TeamModel.findByPk(id);

    return team;
  }
}

export default TeamsService;
