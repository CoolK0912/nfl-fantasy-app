import { FantasyTeam, Player, TeamRating } from '@/types';

/**
 * Calculate comprehensive team rating based on roster composition
 */
export function calculateTeamRating(team: FantasyTeam): TeamRating {
  const qbs = team.roster.filter(p => p.position === 'QB');
  const rbs = team.roster.filter(p => p.position === 'RB');
  const wrs = team.roster.filter(p => p.position === 'WR');
  const tes = team.roster.filter(p => p.position === 'TE');

  const qbStrength = calculatePositionStrength(qbs);
  const rbStrength = calculatePositionStrength(rbs);
  const wrStrength = calculatePositionStrength(wrs);
  const teStrength = calculatePositionStrength(tes);

  // Depth score: measure roster depth beyond starters
  const depth = calculateDepthScore(team.roster);

  // Upside: potential for high-scoring weeks based on player variance
  const upside = calculateUpsideScore(team.roster);

  // Overall rating: weighted combination
  const overall = (
    qbStrength * 0.25 +
    rbStrength * 0.25 +
    wrStrength * 0.25 +
    teStrength * 0.15 +
    depth * 0.05 +
    upside * 0.05
  );

  return {
    overall: Math.round(overall * 10) / 10,
    qbStrength: Math.round(qbStrength * 10) / 10,
    rbStrength: Math.round(rbStrength * 10) / 10,
    wrStrength: Math.round(wrStrength * 10) / 10,
    teStrength: Math.round(teStrength * 10) / 10,
    depth: Math.round(depth * 10) / 10,
    upside: Math.round(upside * 10) / 10,
  };
}

function calculatePositionStrength(players: Player[]): number {
  if (players.length === 0) return 0;

  // Sort by projected points descending
  const sorted = [...players].sort((a, b) => b.projectedPoints - a.projectedPoints);

  // Weight starters more heavily than bench
  let totalStrength = 0;
  let weights = [1.0, 0.7, 0.4, 0.2, 0.1]; // Diminishing returns

  sorted.forEach((player, index) => {
    const weight = weights[index] || 0.05;
    totalStrength += player.projectedPoints * weight;
  });

  // Normalize to 0-100 scale
  return Math.min(100, totalStrength / 2);
}

function calculateDepthScore(roster: Player[]): number {
  // Count quality bench players (projected > 8 points)
  const benchQuality = roster.filter(p => p.projectedPoints > 8).length;
  return Math.min(100, benchQuality * 10);
}

function calculateUpsideScore(roster: Player[]): number {
  // Players with high ceiling (variance in performance)
  // Simplified: use top-end projected points
  const topPlayers = roster
    .sort((a, b) => b.projectedPoints - a.projectedPoints)
    .slice(0, 5);

  const avgTop = topPlayers.reduce((sum, p) => sum + p.projectedPoints, 0) / topPlayers.length;
  return Math.min(100, avgTop * 4);
}

/**
 * Get skill rating tier (S, A, B, C, D, F)
 */
export function getSkillTier(rating: number): string {
  if (rating >= 90) return 'S';
  if (rating >= 80) return 'A';
  if (rating >= 70) return 'B';
  if (rating >= 60) return 'C';
  if (rating >= 50) return 'D';
  return 'F';
}

/**
 * Compare two teams
 */
export function compareTeams(team1: FantasyTeam, team2: FantasyTeam) {
  const rating1 = calculateTeamRating(team1);
  const rating2 = calculateTeamRating(team2);

  return {
    team1Rating: rating1,
    team2Rating: rating2,
    winner: rating1.overall > rating2.overall ? team1.name : team2.name,
    difference: Math.abs(rating1.overall - rating2.overall),
  };
}
