import MatchesService from './matchesService';
import ReturnLeaderboard from '../Interfaces/Leaderboard/ReturnLeaderboart';
import LeaderboardUtils from '../utils/leaderboardUtils';
import Matches from '../Interfaces/Matches/Matches';

class LeaderboardService {
  static async getLeaderboard(): Promise<ReturnLeaderboard[]> {
    const allMatches: Matches[] = await MatchesService.getMatchByProgress('false');

    const leaderboard = await LeaderboardUtils.createLeaderboard();

    const updatePoints = await LeaderboardUtils.updatePoints(leaderboard, allMatches);

    const uptadeVictoriesAndLosses = await LeaderboardUtils
      .updateVictoriesAndLosses(updatePoints, allMatches);

    const updateDraws = await LeaderboardUtils.updateDraw(uptadeVictoriesAndLosses, allMatches);

    const ordered = LeaderboardUtils.orderLeaderboard(updateDraws).map((obj) => {
      const { id, ...rest } = obj;
      return rest;
    });

    return ordered;
  }
}

export default LeaderboardService;
