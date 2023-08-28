import TeamModel from '../database/models/TeamModel';

class TeamsService {
  static async getAllTeams() {
    const teams = await TeamModel.findAll();

    return teams;
  }
}

export default TeamsService;
