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

    return matches;
  }

  static async getMatchByProgress(inProgress: string) {
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

    if (inProgress === 'true') return matches.filter((match) => match.inProgress === true);
    if (inProgress === 'false') return matches.filter((match) => match.inProgress === false);
  }

  static async finishMatch(id: string) {
    await Match.update({ inProgress: false }, { where: { id } });

    return { message: 'Finished' };
  }
}

export default MatchesService;
