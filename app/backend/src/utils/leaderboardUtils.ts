import Team from '../database/models/TeamModel';
import ILeaderboard from '../Interfaces/Leaderboard/Leaderboard';
import IMatches from '../Interfaces/Matches/Matches';

export default class LeaderboardUtils {
  static async createLeaderboard(): Promise<ILeaderboard[]> {
    const allTeams = await Team.findAll();

    const leaderboard: ILeaderboard[] = allTeams.map((team) => ({
      id: team.id,
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
    }));

    return leaderboard;
  }

  static async updatePoints(
    leaderboard: ILeaderboard[],
    match: IMatches[],
  ): Promise<ILeaderboard[]> {
    const updatedLeaderboard = leaderboard.map((team) => ({ ...team }));

    match.forEach((game) => {
      updatedLeaderboard[game.homeTeamId - 1].totalGames += 1;
      updatedLeaderboard[game.awayTeamId - 1].totalGames += 1;
      updatedLeaderboard[game.homeTeamId - 1].goalsFavor += game.homeTeamGoals;
      updatedLeaderboard[game.awayTeamId - 1].goalsFavor += game.awayTeamGoals;
      updatedLeaderboard[game.homeTeamId - 1].goalsOwn += game.awayTeamGoals;
      updatedLeaderboard[game.awayTeamId - 1].goalsOwn += game.homeTeamGoals;
    });

    return updatedLeaderboard;
  }

  static async updateVictoriesAndLosses(
    leaderboard: ILeaderboard[],
    match: IMatches[],
  ): Promise<ILeaderboard[]> {
    const updatedLeaderboard = leaderboard.map((team) => ({ ...team }));

    match.forEach((game) => {
      if (game.homeTeamGoals > game.awayTeamGoals) {
        updatedLeaderboard[game.homeTeamId - 1].totalPoints += 3;
        updatedLeaderboard[game.homeTeamId - 1].totalVictories += 1;
        updatedLeaderboard[game.awayTeamId - 1].totalLosses += 1;
      }
      if (game.homeTeamGoals < game.awayTeamGoals) {
        updatedLeaderboard[game.awayTeamId - 1].totalPoints += 3;
        updatedLeaderboard[game.awayTeamId - 1].totalVictories += 1;
        updatedLeaderboard[game.homeTeamId - 1].totalLosses += 1;
      }
    });

    return updatedLeaderboard;
  }

  static async updateDraw(
    leaderboard: ILeaderboard[],
    match: IMatches[],
  ): Promise<ILeaderboard[]> {
    const updatedLeaderboard = leaderboard.map((team) => ({ ...team }));

    match.forEach((game) => {
      if (game.homeTeamGoals === game.awayTeamGoals) {
        updatedLeaderboard[game.homeTeamId - 1].totalPoints += 1;
        updatedLeaderboard[game.awayTeamId - 1].totalPoints += 1;
        updatedLeaderboard[game.homeTeamId - 1].totalDraws += 1;
        updatedLeaderboard[game.awayTeamId - 1].totalDraws += 1;
      }
    });

    return updatedLeaderboard;
  }

  static orderLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    const orderLeaderboard = leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      return b.totalVictories - a.totalVictories || 0;
    });

    return orderLeaderboard;
  }
}
