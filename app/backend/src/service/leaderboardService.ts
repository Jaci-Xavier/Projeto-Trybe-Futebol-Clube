import MatchesService from './matchesService';
import ReturnLeaderboard from '../Interfaces/Leaderboard/ReturnLeaderboart';
import HomeLeaderboardUtils from '../utils/homeLeaderboardUtils';
import AwayLeaderboardUtils from '../utils/awayLeaderboardUtils';
import AllLeaderboardUtils from '../utils/allLeaderboardUtils';
import Matches from '../Interfaces/Matches/Matches';

class LeaderboardService {
  static async getHomeLeaderboard(): Promise<ReturnLeaderboard[]> {
    const allMatches: Matches[] = await MatchesService.getMatchByProgress('false');

    const leaderboard = await HomeLeaderboardUtils.createLeaderboard();

    const updatePoints = await HomeLeaderboardUtils.updatePoints(leaderboard, allMatches);

    const uptadeVictoriesAndLosses = await HomeLeaderboardUtils
      .updateVictoriesAndLosses(updatePoints, allMatches);

    const updateDraws = await HomeLeaderboardUtils.updateDraw(uptadeVictoriesAndLosses, allMatches);

    const updateGoalsBalance = await HomeLeaderboardUtils
      .updateGoalsBalance(updateDraws, allMatches);

    const updateEfficiency = await HomeLeaderboardUtils
      .updateEfficiency(updateGoalsBalance, allMatches);

    const ordered = HomeLeaderboardUtils.orderLeaderboard(updateEfficiency).map((obj) => {
      const { id, ...rest } = obj;
      return rest;
    });

    return ordered;
  }

  static async getAwayLeaderboard(): Promise<ReturnLeaderboard[]> {
    const allMatches: Matches[] = await MatchesService.getMatchByProgress('false');

    const leaderboard = await AwayLeaderboardUtils.createLeaderboard();

    const updatePoints = await AwayLeaderboardUtils.updatePoints(leaderboard, allMatches);

    const uptadeVictoriesAndLosses = await AwayLeaderboardUtils
      .updateVictoriesAndLosses(updatePoints, allMatches);

    const updateDraws = await AwayLeaderboardUtils.updateDraw(uptadeVictoriesAndLosses, allMatches);

    const updateGoalsBalance = await AwayLeaderboardUtils
      .updateGoalsBalance(updateDraws, allMatches);

    const updateEfficiency = await AwayLeaderboardUtils
      .updateEfficiency(updateGoalsBalance, allMatches);

    const ordered = AwayLeaderboardUtils.orderLeaderboard(updateEfficiency).map((obj) => {
      const { id, ...rest } = obj;
      return rest;
    });

    return ordered;
  }

  static async getAllLeaderboard(): Promise<ReturnLeaderboard[]> {
    const allMatches: Matches[] = await MatchesService.getMatchByProgress('false');

    const leaderboard = await AllLeaderboardUtils.createLeaderboard();

    const updatePoints = await AllLeaderboardUtils.updatePoints(leaderboard, allMatches);

    const uptadeVictoriesAndLosses = await AllLeaderboardUtils
      .updateVictoriesAndLosses(updatePoints, allMatches);

    const updateDraws = await AllLeaderboardUtils.updateDraw(uptadeVictoriesAndLosses, allMatches);

    const updateGoalsBalance = await AllLeaderboardUtils
      .updateGoalsBalance(updateDraws, allMatches);

    const updateEfficiency = await AllLeaderboardUtils
      .updateEfficiency(updateGoalsBalance, allMatches);

    const ordered = AllLeaderboardUtils.orderLeaderboard(updateEfficiency).map((obj) => {
      const { id, ...rest } = obj;
      return rest;
    });

    return ordered;
  }
}

export default LeaderboardService;
