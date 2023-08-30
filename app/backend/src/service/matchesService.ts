import IResponse from '../Interfaces/Response/Response';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import IMatches from '../Interfaces/Matches/Matches';

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
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    switch (inProgress) {
      case 'true':
        return matches.filter((match) => match.inProgress === true);
      default:
        matches.filter((match) => match.inProgress === false);
        break;
    }

    // if (inProgress === 'true') return matches.filter((match) => match.inProgress === true);
    // if (inProgress === 'false') return matches.filter((match) => match.inProgress === false);
  }

  static async finishMatch(id: string) {
    await Match.update({ inProgress: false }, { where: { id } });

    return { message: 'Finished' };
  }

  static async updateMatch(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    await Match.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });

    return { homeTeamGoals, awayTeamGoals };
  }

  static async createMatch(data: IMatches): Promise<IResponse> {
    if (data.homeTeamId === data.awayTeamId) {
      return { status: 422,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const team1 = await Team.findByPk(data.homeTeamId);
    const team2 = await Team.findByPk(data.awayTeamId);

    if (!team1 || !team2) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }

    const match = await Match.create({ ...data, inProgress: true });

    return { status: 201, data: match };
  }
}

export default MatchesService;
