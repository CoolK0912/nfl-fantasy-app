import { NFLTeam, DivisionStandings, PlayoffBracket, PlayoffGame } from '@/types';
import { calculateTeamStrength, predictGame } from './gamePrediction';

/**
 * Generate playoff bracket based on current standings
 */
export function generatePlayoffBracket(teams: NFLTeam[]): PlayoffBracket {
  const { afcTeams, nfcTeams } = seedPlayoffTeams(teams);

  // AFC Bracket
  const afcWildCard = [
    createPlayoffGame('Wild Card', afcTeams[1].abbreviation, afcTeams[6].abbreviation),
    createPlayoffGame('Wild Card', afcTeams[2].abbreviation, afcTeams[5].abbreviation),
    createPlayoffGame('Wild Card', afcTeams[3].abbreviation, afcTeams[4].abbreviation),
  ];

  // NFC Bracket
  const nfcWildCard = [
    createPlayoffGame('Wild Card', nfcTeams[1].abbreviation, nfcTeams[6].abbreviation),
    createPlayoffGame('Wild Card', nfcTeams[2].abbreviation, nfcTeams[5].abbreviation),
    createPlayoffGame('Wild Card', nfcTeams[3].abbreviation, nfcTeams[4].abbreviation),
  ];

  const wildCard = [...afcWildCard, ...nfcWildCard];

  // Simulate Wild Card round
  const afcWildCardWinners = afcWildCard.map(game => game.predictedWinner);
  const nfcWildCardWinners = nfcWildCard.map(game => game.predictedWinner);

  // Divisional Round
  const afcDivisional = [
    createPlayoffGame('Divisional', afcTeams[0].abbreviation, afcWildCardWinners[2]),
    createPlayoffGame('Divisional', afcWildCardWinners[0], afcWildCardWinners[1]),
  ];

  const nfcDivisional = [
    createPlayoffGame('Divisional', nfcTeams[0].abbreviation, nfcWildCardWinners[2]),
    createPlayoffGame('Divisional', nfcWildCardWinners[0], nfcWildCardWinners[1]),
  ];

  const divisional = [...afcDivisional, ...nfcDivisional];

  // Championship Round
  const afcChampionship = createPlayoffGame(
    'Championship',
    afcDivisional[0].predictedWinner,
    afcDivisional[1].predictedWinner
  );

  const nfcChampionship = createPlayoffGame(
    'Championship',
    nfcDivisional[0].predictedWinner,
    nfcDivisional[1].predictedWinner
  );

  const championship = [afcChampionship, nfcChampionship];

  // Super Bowl
  const superBowl = createPlayoffGame(
    'Super Bowl',
    afcChampionship.predictedWinner,
    nfcChampionship.predictedWinner
  );

  return {
    wildCard,
    divisional,
    championship,
    superBowl,
  };
}

/**
 * Seed playoff teams (top 7 from each conference)
 */
function seedPlayoffTeams(teams: NFLTeam[]): {
  afcTeams: NFLTeam[];
  nfcTeams: NFLTeam[];
} {
  const afcTeams = teams
    .filter(t => t.division.startsWith('AFC'))
    .sort(compareTeams);

  const nfcTeams = teams
    .filter(t => t.division.startsWith('NFC'))
    .sort(compareTeams);

  return {
    afcTeams: afcTeams.slice(0, 7),
    nfcTeams: nfcTeams.slice(0, 7),
  };
}

/**
 * Compare teams for playoff seeding
 */
function compareTeams(a: NFLTeam, b: NFLTeam): number {
  const aWinPct = (a.record.wins + a.record.ties * 0.5) /
    (a.record.wins + a.record.losses + a.record.ties);
  const bWinPct = (b.record.wins + b.record.ties * 0.5) /
    (b.record.wins + b.record.losses + b.record.ties);

  if (aWinPct !== bWinPct) {
    return bWinPct - aWinPct; // Higher win % first
  }

  // Tiebreaker: point differential
  const aDiff = a.pointsFor - a.pointsAgainst;
  const bDiff = b.pointsFor - b.pointsAgainst;
  return bDiff - aDiff;
}

/**
 * Create a playoff game with prediction
 */
function createPlayoffGame(
  round: PlayoffGame['round'],
  homeTeamAbbr: string,
  awayTeamAbbr: string
): PlayoffGame {
  // For simulation purposes, we'll use a simplified prediction
  // In a real app, this would fetch full team data
  const homeStrength = 50 + Math.random() * 20; // Simplified
  const awayStrength = 50 + Math.random() * 20;

  const predictedWinner = homeStrength > awayStrength ? homeTeamAbbr : awayTeamAbbr;
  const homeScore = Math.round(20 + Math.random() * 15);
  const awayScore = predictedWinner === homeTeamAbbr
    ? Math.round(homeScore - 3 - Math.random() * 10)
    : Math.round(homeScore + 3 + Math.random() * 7);

  return {
    id: `${round}-${homeTeamAbbr}-${awayTeamAbbr}`,
    round,
    homeTeam: homeTeamAbbr,
    awayTeam: awayTeamAbbr,
    predictedWinner,
    homeScore,
    awayScore: Math.max(10, awayScore),
  };
}

/**
 * Project final division standings
 */
export function projectDivisionStandings(
  teams: NFLTeam[],
  projectedRecords: Map<string, { wins: number; losses: number; ties: number }>
): DivisionStandings {
  const standings: DivisionStandings = {};

  // Group teams by division
  const divisions = [
    'AFC East', 'AFC North', 'AFC South', 'AFC West',
    'NFC East', 'NFC North', 'NFC South', 'NFC West',
  ];

  divisions.forEach(division => {
    const divisionTeams = teams
      .filter(t => t.division === division)
      .map(t => {
        const projected = projectedRecords.get(t.abbreviation);
        return {
          ...t,
          record: projected || t.record,
        };
      })
      .sort(compareTeams);

    standings[division] = divisionTeams;
  });

  return standings;
}

/**
 * Run multiple playoff simulations and return probabilities
 */
export function simulatePlayoffs(
  teams: NFLTeam[],
  simulations: number = 1000
): Map<string, { championships: number; appearances: number }> {
  const results = new Map<string, { championships: number; appearances: number }>();

  teams.forEach(team => {
    results.set(team.abbreviation, { championships: 0, appearances: 0 });
  });

  for (let i = 0; i < simulations; i++) {
    const bracket = generatePlayoffBracket(teams);
    const champion = bracket.superBowl.predictedWinner;
    const afcChamp = bracket.championship.find(g => g.homeTeam.startsWith('A') || g.awayTeam.startsWith('A'))?.predictedWinner;
    const nfcChamp = bracket.championship.find(g => g.homeTeam.startsWith('N') || g.awayTeam.startsWith('N'))?.predictedWinner;

    // Update results
    const championResults = results.get(champion);
    if (championResults) {
      championResults.championships++;
      championResults.appearances++;
    }

    // Update runner-up
    const runnerUp = bracket.superBowl.homeTeam === champion
      ? bracket.superBowl.awayTeam
      : bracket.superBowl.homeTeam;
    const runnerUpResults = results.get(runnerUp);
    if (runnerUpResults) {
      runnerUpResults.appearances++;
    }
  }

  // Convert counts to percentages
  results.forEach((value, key) => {
    value.championships = (value.championships / simulations) * 100;
    value.appearances = (value.appearances / simulations) * 100;
  });

  return results;
}

/**
 * Get Super Bowl odds for all teams
 */
export function getSuperBowlOdds(teams: NFLTeam[]): Array<{ team: string; odds: number }> {
  return teams
    .map(team => ({
      team: team.abbreviation,
      odds: calculateSuperBowlOdds(team, teams),
    }))
    .sort((a, b) => b.odds - a.odds);
}

/**
 * Calculate individual team's Super Bowl odds
 */
function calculateSuperBowlOdds(team: NFLTeam, allTeams: NFLTeam[]): number {
  const strength = calculateTeamStrength(team);
  const avgStrength = allTeams.reduce((sum, t) => sum + calculateTeamStrength(t), 0) / allTeams.length;

  // Normalize to probability
  const relativeStrength = strength / avgStrength;
  const baseOdds = relativeStrength / allTeams.length;

  // Apply playoff probability multiplier
  const playoffProb = calculatePlayoffProbability(team, allTeams);

  return Math.min(100, baseOdds * playoffProb * 100);
}

/**
 * Calculate team's probability of making playoffs
 */
function calculatePlayoffProbability(team: NFLTeam, allTeams: NFLTeam[]): number {
  const conferenceTeams = allTeams.filter(t =>
    t.division.split(' ')[0] === team.division.split(' ')[0]
  );

  const teamRank = conferenceTeams
    .sort(compareTeams)
    .findIndex(t => t.id === team.id) + 1;

  if (teamRank <= 7) {
    return 0.9 - (teamRank - 1) * 0.1; // 90% for #1 seed, 80% for #2, etc.
  }

  // Calculate games back from 7th seed
  const seventhSeed = conferenceTeams.sort(compareTeams)[6];
  const gamesBack = (
    (seventhSeed.record.wins - team.record.wins) +
    (team.record.losses - seventhSeed.record.losses)
  ) / 2;

  // Probability decreases with games back
  return Math.max(0, 0.5 - gamesBack * 0.15);
}
