import { Player, TradeProposal, TradeAnalysis, FantasyTeam, TeamRating } from '@/types';
import { calculateTeamRating } from './teamRating';

/**
 * Analyze a proposed trade between two teams
 */
export function analyzeTrade(
  proposal: TradeProposal,
  team1: FantasyTeam,
  team2: FantasyTeam
): TradeAnalysis {
  // Calculate current value of players being traded
  const team1GivesValue = calculatePlayersValue(proposal.team1Gives);
  const team2GivesValue = calculatePlayersValue(proposal.team2Gives);

  // Simulate rosters after trade
  const team1AfterTrade = simulateTradeForTeam(
    team1,
    proposal.team1Gives,
    proposal.team2Gives
  );
  const team2AfterTrade = simulateTradeForTeam(
    team2,
    proposal.team2Gives,
    proposal.team1Gives
  );

  // Calculate ratings before and after
  const team1BeforeRating = calculateTeamRating(team1);
  const team2BeforeRating = calculateTeamRating(team2);
  const team1AfterRating = calculateTeamRating(team1AfterTrade);
  const team2AfterRating = calculateTeamRating(team2AfterTrade);

  // Determine winner
  const differential = team1GivesValue - team2GivesValue;
  const percentageDiff = Math.abs(differential) / Math.max(team1GivesValue, team2GivesValue) * 100;

  let winner: 'team1' | 'team2' | 'fair';
  if (percentageDiff < 10) {
    winner = 'fair';
  } else if (team2GivesValue > team1GivesValue) {
    winner = 'team1'; // Team 1 gets more value
  } else {
    winner = 'team2'; // Team 2 gets more value
  }

  // Generate recommendation
  const recommendation = generateRecommendation(
    winner,
    differential,
    team1BeforeRating,
    team1AfterRating,
    team2BeforeRating,
    team2AfterRating
  );

  return {
    team1Value: Math.round(team1GivesValue * 10) / 10,
    team2Value: Math.round(team2GivesValue * 10) / 10,
    winner,
    differential: Math.round(Math.abs(differential) * 10) / 10,
    recommendation,
    impactOnTeam1: {
      overall: team1AfterRating.overall - team1BeforeRating.overall,
      qbStrength: team1AfterRating.qbStrength - team1BeforeRating.qbStrength,
      rbStrength: team1AfterRating.rbStrength - team1BeforeRating.rbStrength,
      wrStrength: team1AfterRating.wrStrength - team1BeforeRating.wrStrength,
      teStrength: team1AfterRating.teStrength - team1BeforeRating.teStrength,
      depth: team1AfterRating.depth - team1BeforeRating.depth,
      upside: team1AfterRating.upside - team1BeforeRating.upside,
    },
    impactOnTeam2: {
      overall: team2AfterRating.overall - team2BeforeRating.overall,
      qbStrength: team2AfterRating.qbStrength - team2BeforeRating.qbStrength,
      rbStrength: team2AfterRating.rbStrength - team2BeforeRating.rbStrength,
      wrStrength: team2AfterRating.wrStrength - team2BeforeRating.wrStrength,
      teStrength: team2AfterRating.teStrength - team2BeforeRating.teStrength,
      depth: team2AfterRating.depth - team2BeforeRating.depth,
      upside: team2AfterRating.upside - team2BeforeRating.upside,
    },
  };
}

/**
 * Calculate total value of a group of players
 */
function calculatePlayersValue(players: Player[]): number {
  return players.reduce((sum, player) => sum + calculatePlayerValue(player), 0);
}

/**
 * Calculate individual player value
 * Based on projected points, positional scarcity, and consistency
 */
function calculatePlayerValue(player: Player): number {
  let baseValue = player.projectedPoints;

  // Position scarcity multipliers
  const scarcityMultipliers: Record<string, number> = {
    QB: 1.0,
    RB: 1.3,  // RBs are more scarce
    WR: 1.1,
    TE: 1.2,  // Top TEs are valuable
    K: 0.5,
    DEF: 0.6,
  };

  baseValue *= scarcityMultipliers[player.position] || 1.0;

  // Adjust for current performance vs projection
  if (player.fantasyPoints > 0) {
    const performanceRatio = player.fantasyPoints / player.projectedPoints;
    baseValue *= (0.7 + 0.3 * performanceRatio); // Weight recent performance
  }

  return baseValue;
}

/**
 * Simulate team roster after trade
 */
function simulateTradeForTeam(
  team: FantasyTeam,
  playersOut: Player[],
  playersIn: Player[]
): FantasyTeam {
  const newRoster = team.roster.filter(
    p => !playersOut.some(out => out.id === p.id)
  );

  return {
    ...team,
    roster: [...newRoster, ...playersIn],
  };
}

/**
 * Generate human-readable recommendation
 */
function generateRecommendation(
  winner: 'team1' | 'team2' | 'fair',
  differential: number,
  team1Before: TeamRating,
  team1After: TeamRating,
  team2Before: TeamRating,
  team2After: TeamRating
): string {
  if (winner === 'fair') {
    return 'This is a fair trade with balanced value. Both teams could benefit based on their needs.';
  }

  const winningTeam = winner === 'team1' ? 'Team 1' : 'Team 2';
  const losingTeam = winner === 'team1' ? 'Team 2' : 'Team 1';

  const winnerRatingChange = winner === 'team1'
    ? team1After.overall - team1Before.overall
    : team2After.overall - team2Before.overall;

  const loserRatingChange = winner === 'team1'
    ? team2After.overall - team2Before.overall
    : team1After.overall - team1Before.overall;

  let recommendation = `${winningTeam} wins this trade by receiving approximately ${Math.abs(differential).toFixed(1)} more points in value. `;

  if (winnerRatingChange > 5) {
    recommendation += `${winningTeam} significantly improves their roster (+${winnerRatingChange.toFixed(1)} overall rating). `;
  }

  if (loserRatingChange < -3) {
    recommendation += `${losingTeam} may want to reconsider as their team rating decreases by ${Math.abs(loserRatingChange).toFixed(1)}. `;
  }

  return recommendation;
}

/**
 * Suggest counter offers to balance a trade
 */
export function suggestCounterOffer(
  analysis: TradeAnalysis,
  team1Roster: Player[],
  team2Roster: Player[]
): string[] {
  const suggestions: string[] = [];

  if (analysis.winner === 'fair') {
    return ['Trade is already fair!'];
  }

  const deficit = analysis.differential;
  const losingTeam = analysis.winner === 'team1' ? 2 : 1;
  const winningRoster = losingTeam === 1 ? team2Roster : team1Roster;

  // Find players that could balance the trade
  const additionalPlayers = winningRoster
    .filter(p => {
      const value = calculatePlayerValue(p);
      return value >= deficit * 0.7 && value <= deficit * 1.3;
    })
    .sort((a, b) => {
      const aValue = Math.abs(calculatePlayerValue(a) - deficit);
      const bValue = Math.abs(calculatePlayerValue(b) - deficit);
      return aValue - bValue;
    })
    .slice(0, 3);

  additionalPlayers.forEach(player => {
    suggestions.push(
      `Add ${player.name} (${player.position}) to Team ${losingTeam === 1 ? 2 : 1}'s side`
    );
  });

  if (suggestions.length === 0) {
    suggestions.push('Consider adding draft picks or FAAB budget to balance the trade.');
  }

  return suggestions;
}
