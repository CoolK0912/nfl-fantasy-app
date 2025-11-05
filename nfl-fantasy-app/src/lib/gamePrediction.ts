import { NFLTeam, Game } from '@/types';

/**
 * Predict the outcome of an NFL game using ELO-based ratings
 */
export function predictGame(
  homeTeam: NFLTeam,
  awayTeam: NFLTeam,
  week: number
): Game['winProbability'] & { predictedHomeScore: number; predictedAwayScore: number } {
  // Calculate team strength ratings
  const homeStrength = calculateTeamStrength(homeTeam);
  const awayStrength = calculateTeamStrength(awayTeam);

  // Home field advantage (typically worth about 3 points)
  const homeAdvantage = 3;

  // Expected point differential
  const expectedDiff = (homeStrength - awayStrength) + homeAdvantage;

  // Convert to win probability using logistic function
  const homeWinProb = 1 / (1 + Math.pow(10, -expectedDiff / 15));
  const awayWinProb = 1 - homeWinProb;

  // Predict scores based on team averages and matchup
  const leagueAvgPoints = 22; // NFL average points per game
  const predictedHomeScore = Math.round(
    leagueAvgPoints + (homeStrength / 10) + (homeAdvantage / 2) - (awayStrength / 20)
  );
  const predictedAwayScore = Math.round(
    leagueAvgPoints + (awayStrength / 10) - (homeStrength / 20)
  );

  return {
    home: Math.round(homeWinProb * 100) / 100,
    away: Math.round(awayWinProb * 100) / 100,
    predictedHomeScore: Math.max(10, predictedHomeScore), // Minimum 10 points
    predictedAwayScore: Math.max(10, predictedAwayScore),
  };
}

/**
 * Calculate team strength based on record, point differential, and recent performance
 */
export function calculateTeamStrength(team: NFLTeam): number {
  const totalGames = team.record.wins + team.record.losses + team.record.ties;
  if (totalGames === 0) return 50; // Neutral rating for new season

  // Win percentage component (0-50 points)
  const winPct = (team.record.wins + team.record.ties * 0.5) / totalGames;
  const winComponent = winPct * 50;

  // Point differential component (0-30 points)
  const pointDiff = team.pointsFor - team.pointsAgainst;
  const avgPointDiff = pointDiff / totalGames;
  const diffComponent = Math.max(-15, Math.min(15, avgPointDiff)) + 15; // Normalize to 0-30

  // Strength of schedule/quality component (0-20 points)
  const qualityComponent = team.strength || 10; // Use provided strength or default

  return winComponent + diffComponent + qualityComponent;
}

/**
 * Predict all remaining games for the season
 */
export function predictRemainingSeason(
  teams: NFLTeam[],
  schedule: Game[],
  currentWeek: number
): Game[] {
  const teamsMap = new Map(teams.map(t => [t.abbreviation, t]));

  return schedule
    .filter(game => game.week >= currentWeek && !game.played)
    .map(game => {
      const homeTeam = teamsMap.get(game.homeTeam);
      const awayTeam = teamsMap.get(game.awayTeam);

      if (!homeTeam || !awayTeam) return game;

      const prediction = predictGame(homeTeam, awayTeam, game.week);

      return {
        ...game,
        predictedHomeScore: prediction.predictedHomeScore,
        predictedAwayScore: prediction.predictedAwayScore,
        winProbability: {
          home: prediction.home,
          away: prediction.away,
        },
      };
    });
}

/**
 * Simulate season outcomes using Monte Carlo simulation
 */
export function simulateSeason(
  teams: NFLTeam[],
  predictions: Game[],
  simulations: number = 1000
): Map<string, { wins: number; losses: number; ties: number }> {
  const results = new Map<string, { wins: number; losses: number; ties: number }>();

  // Initialize results
  teams.forEach(team => {
    results.set(team.abbreviation, {
      wins: team.record.wins,
      losses: team.record.losses,
      ties: team.record.ties,
    });
  });

  // Run simulations
  for (let sim = 0; sim < simulations; sim++) {
    const simResults = new Map(results);

    predictions.forEach(game => {
      if (game.winProbability) {
        const random = Math.random();
        const homeWins = random < game.winProbability.home;

        const homeRecord = simResults.get(game.homeTeam)!;
        const awayRecord = simResults.get(game.awayTeam)!;

        if (homeWins) {
          homeRecord.wins++;
          awayRecord.losses++;
        } else {
          awayRecord.wins++;
          homeRecord.losses++;
        }
      }
    });

    // Average the results
    if (sim === 0) {
      simResults.forEach((record, team) => {
        results.set(team, record);
      });
    } else {
      simResults.forEach((record, team) => {
        const current = results.get(team)!;
        current.wins = (current.wins * sim + record.wins) / (sim + 1);
        current.losses = (current.losses * sim + record.losses) / (sim + 1);
      });
    }
  }

  return results;
}

/**
 * Get team's remaining strength of schedule
 */
export function calculateStrengthOfSchedule(
  team: NFLTeam,
  opponents: NFLTeam[]
): number {
  if (opponents.length === 0) return 0.5;

  const avgOpponentStrength = opponents.reduce((sum, opp) => {
    return sum + calculateTeamStrength(opp);
  }, 0) / opponents.length;

  // Normalize to 0-1 scale
  return avgOpponentStrength / 100;
}
