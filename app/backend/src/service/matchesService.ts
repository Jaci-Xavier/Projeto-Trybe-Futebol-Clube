import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

class MatchesService {
  static async getAllMaches() {
    const matches = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    console.log(matches);

    return matches;
  }
}

export default MatchesService;
