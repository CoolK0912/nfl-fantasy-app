import { Player, FantasyTeam, NFLTeam, Game } from '@/types';

// Sample NFL Teams for 2025-2026 season
export const nflTeams: NFLTeam[] = [
  // AFC East
  { id: '1', name: 'Buffalo Bills', abbreviation: 'BUF', division: 'AFC East', record: { wins: 7, losses: 2, ties: 0 }, pointsFor: 245, pointsAgainst: 198, strength: 88 },
  { id: '2', name: 'Miami Dolphins', abbreviation: 'MIA', division: 'AFC East', record: { wins: 6, losses: 3, ties: 0 }, pointsFor: 232, pointsAgainst: 210, strength: 82 },
  { id: '3', name: 'New York Jets', abbreviation: 'NYJ', division: 'AFC East', record: { wins: 4, losses: 5, ties: 0 }, pointsFor: 198, pointsAgainst: 215, strength: 68 },
  { id: '4', name: 'New England Patriots', abbreviation: 'NE', division: 'AFC East', record: { wins: 3, losses: 6, ties: 0 }, pointsFor: 176, pointsAgainst: 228, strength: 58 },

  // AFC North
  { id: '5', name: 'Baltimore Ravens', abbreviation: 'BAL', division: 'AFC North', record: { wins: 7, losses: 2, ties: 0 }, pointsFor: 258, pointsAgainst: 205, strength: 90 },
  { id: '6', name: 'Pittsburgh Steelers', abbreviation: 'PIT', division: 'AFC North', record: { wins: 6, losses: 3, ties: 0 }, pointsFor: 221, pointsAgainst: 198, strength: 81 },
  { id: '7', name: 'Cleveland Browns', abbreviation: 'CLE', division: 'AFC North', record: { wins: 4, losses: 5, ties: 0 }, pointsFor: 203, pointsAgainst: 219, strength: 70 },
  { id: '8', name: 'Cincinnati Bengals', abbreviation: 'CIN', division: 'AFC North', record: { wins: 5, losses: 4, ties: 0 }, pointsFor: 235, pointsAgainst: 222, strength: 78 },

  // AFC South
  { id: '9', name: 'Houston Texans', abbreviation: 'HOU', division: 'AFC South', record: { wins: 6, losses: 3, ties: 0 }, pointsFor: 228, pointsAgainst: 203, strength: 83 },
  { id: '10', name: 'Jacksonville Jaguars', abbreviation: 'JAX', division: 'AFC South', record: { wins: 5, losses: 4, ties: 0 }, pointsFor: 212, pointsAgainst: 215, strength: 75 },
  { id: '11', name: 'Indianapolis Colts', abbreviation: 'IND', division: 'AFC South', record: { wins: 4, losses: 5, ties: 0 }, pointsFor: 195, pointsAgainst: 208, strength: 69 },
  { id: '12', name: 'Tennessee Titans', abbreviation: 'TEN', division: 'AFC South', record: { wins: 3, losses: 6, ties: 0 }, pointsFor: 180, pointsAgainst: 235, strength: 60 },

  // AFC West
  { id: '13', name: 'Kansas City Chiefs', abbreviation: 'KC', division: 'AFC West', record: { wins: 8, losses: 1, ties: 0 }, pointsFor: 268, pointsAgainst: 185, strength: 95 },
  { id: '14', name: 'Los Angeles Chargers', abbreviation: 'LAC', division: 'AFC West', record: { wins: 5, losses: 4, ties: 0 }, pointsFor: 218, pointsAgainst: 208, strength: 76 },
  { id: '15', name: 'Denver Broncos', abbreviation: 'DEN', division: 'AFC West', record: { wins: 4, losses: 5, ties: 0 }, pointsFor: 201, pointsAgainst: 221, strength: 67 },
  { id: '16', name: 'Las Vegas Raiders', abbreviation: 'LV', division: 'AFC West', record: { wins: 2, losses: 7, ties: 0 }, pointsFor: 165, pointsAgainst: 248, strength: 52 },

  // NFC East
  { id: '17', name: 'Philadelphia Eagles', abbreviation: 'PHI', division: 'NFC East', record: { wins: 7, losses: 2, ties: 0 }, pointsFor: 251, pointsAgainst: 195, strength: 89 },
  { id: '18', name: 'Dallas Cowboys', abbreviation: 'DAL', division: 'NFC East', record: { wins: 5, losses: 4, ties: 0 }, pointsFor: 225, pointsAgainst: 218, strength: 77 },
  { id: '19', name: 'Washington Commanders', abbreviation: 'WAS', division: 'NFC East', record: { wins: 5, losses: 4, ties: 0 }, pointsFor: 215, pointsAgainst: 212, strength: 74 },
  { id: '20', name: 'New York Giants', abbreviation: 'NYG', division: 'NFC East', record: { wins: 2, losses: 7, ties: 0 }, pointsFor: 172, pointsAgainst: 242, strength: 55 },

  // NFC North
  { id: '21', name: 'Detroit Lions', abbreviation: 'DET', division: 'NFC North', record: { wins: 7, losses: 2, ties: 0 }, pointsFor: 262, pointsAgainst: 201, strength: 91 },
  { id: '22', name: 'Minnesota Vikings', abbreviation: 'MIN', division: 'NFC North', record: { wins: 6, losses: 3, ties: 0 }, pointsFor: 238, pointsAgainst: 210, strength: 84 },
  { id: '23', name: 'Green Bay Packers', abbreviation: 'GB', division: 'NFC North', record: { wins: 5, losses: 4, ties: 0 }, pointsFor: 222, pointsAgainst: 215, strength: 79 },
  { id: '24', name: 'Chicago Bears', abbreviation: 'CHI', division: 'NFC North', record: { wins: 3, losses: 6, ties: 0 }, pointsFor: 188, pointsAgainst: 225, strength: 62 },

  // NFC South
  { id: '25', name: 'Tampa Bay Buccaneers', abbreviation: 'TB', division: 'NFC South', record: { wins: 6, losses: 3, ties: 0 }, pointsFor: 235, pointsAgainst: 208, strength: 80 },
  { id: '26', name: 'Atlanta Falcons', abbreviation: 'ATL', division: 'NFC South', record: { wins: 5, losses: 4, ties: 0 }, pointsFor: 218, pointsAgainst: 215, strength: 73 },
  { id: '27', name: 'New Orleans Saints', abbreviation: 'NO', division: 'NFC South', record: { wins: 4, losses: 5, ties: 0 }, pointsFor: 205, pointsAgainst: 222, strength: 68 },
  { id: '28', name: 'Carolina Panthers', abbreviation: 'CAR', division: 'NFC South', record: { wins: 2, losses: 7, ties: 0 }, pointsFor: 168, pointsAgainst: 251, strength: 50 },

  // NFC West
  { id: '29', name: 'San Francisco 49ers', abbreviation: 'SF', division: 'NFC West', record: { wins: 7, losses: 2, ties: 0 }, pointsFor: 255, pointsAgainst: 198, strength: 92 },
  { id: '30', name: 'Seattle Seahawks', abbreviation: 'SEA', division: 'NFC West', record: { wins: 6, losses: 3, ties: 0 }, pointsFor: 228, pointsAgainst: 208, strength: 81 },
  { id: '31', name: 'Los Angeles Rams', abbreviation: 'LAR', division: 'NFC West', record: { wins: 4, losses: 5, ties: 0 }, pointsFor: 212, pointsAgainst: 225, strength: 71 },
  { id: '32', name: 'Arizona Cardinals', abbreviation: 'ARI', division: 'NFC West', record: { wins: 3, losses: 6, ties: 0 }, pointsFor: 191, pointsAgainst: 238, strength: 61 },
];

// Sample Fantasy Players
export const samplePlayers: Player[] = [
  // QBs
  { id: 'p1', name: 'Patrick Mahomes', position: 'QB', team: 'KC', fantasyPoints: 185, projectedPoints: 24.5, value: 95, stats: { passingYards: 2850, passingTDs: 23, interceptions: 5 } },
  { id: 'p2', name: 'Josh Allen', position: 'QB', team: 'BUF', fantasyPoints: 178, projectedPoints: 23.8, value: 93, stats: { passingYards: 2720, passingTDs: 21, rushingYards: 285, rushingTDs: 4 } },
  { id: 'p3', name: 'Lamar Jackson', position: 'QB', team: 'BAL', fantasyPoints: 182, projectedPoints: 24.2, value: 94, stats: { passingYards: 2680, passingTDs: 20, rushingYards: 512, rushingTDs: 6 } },
  { id: 'p4', name: 'Jalen Hurts', position: 'QB', team: 'PHI', fantasyPoints: 175, projectedPoints: 23.5, value: 91, stats: { passingYards: 2550, passingTDs: 19, rushingYards: 398, rushingTDs: 8 } },

  // RBs
  { id: 'p5', name: 'Christian McCaffrey', position: 'RB', team: 'SF', fantasyPoints: 165, projectedPoints: 21.8, value: 96, stats: { rushingYards: 985, rushingTDs: 11, receptions: 58, receivingYards: 512 } },
  { id: 'p6', name: 'Derrick Henry', position: 'RB', team: 'BAL', fantasyPoints: 152, projectedPoints: 20.2, value: 89, stats: { rushingYards: 1125, rushingTDs: 10, receptions: 18, receivingYards: 145 } },
  { id: 'p7', name: 'Breece Hall', position: 'RB', team: 'NYJ', fantasyPoints: 148, projectedPoints: 19.5, value: 87, stats: { rushingYards: 892, rushingTDs: 8, receptions: 45, receivingYards: 398 } },
  { id: 'p8', name: 'Bijan Robinson', position: 'RB', team: 'ATL', fantasyPoints: 145, projectedPoints: 19.2, value: 85, stats: { rushingYards: 925, rushingTDs: 7, receptions: 42, receivingYards: 368 } },
  { id: 'p9', name: 'Jonathan Taylor', position: 'RB', team: 'IND', fantasyPoints: 138, projectedPoints: 18.5, value: 82, stats: { rushingYards: 982, rushingTDs: 8, receptions: 28, receivingYards: 215 } },

  // WRs
  { id: 'p10', name: 'Tyreek Hill', position: 'WR', team: 'MIA', fantasyPoints: 158, projectedPoints: 20.8, value: 92, stats: { receptions: 72, receivingYards: 1125, receivingTDs: 9, targets: 105 } },
  { id: 'p11', name: 'CeeDee Lamb', position: 'WR', team: 'DAL', fantasyPoints: 155, projectedPoints: 20.5, value: 90, stats: { receptions: 78, receivingYards: 1085, receivingTDs: 8, targets: 115 } },
  { id: 'p12', name: 'Justin Jefferson', position: 'WR', team: 'MIN', fantasyPoints: 151, projectedPoints: 20.2, value: 89, stats: { receptions: 68, receivingYards: 1098, receivingTDs: 7, targets: 98 } },
  { id: 'p13', name: 'Amon-Ra St. Brown', position: 'WR', team: 'DET', fantasyPoints: 147, projectedPoints: 19.8, value: 86, stats: { receptions: 82, receivingYards: 985, receivingTDs: 9, targets: 112 } },
  { id: 'p14', name: 'AJ Brown', position: 'WR', team: 'PHI', fantasyPoints: 149, projectedPoints: 19.9, value: 87, stats: { receptions: 65, receivingYards: 1065, receivingTDs: 8, targets: 95 } },

  // TEs
  { id: 'p15', name: 'Travis Kelce', position: 'TE', team: 'KC', fantasyPoints: 125, projectedPoints: 16.5, value: 84, stats: { receptions: 68, receivingYards: 825, receivingTDs: 7, targets: 95 } },
  { id: 'p16', name: 'Sam LaPorta', position: 'TE', team: 'DET', fantasyPoints: 118, projectedPoints: 15.8, value: 80, stats: { receptions: 62, receivingYards: 745, receivingTDs: 8, targets: 88 } },
  { id: 'p17', name: 'TJ Hockenson', position: 'TE', team: 'MIN', fantasyPoints: 112, projectedPoints: 15.2, value: 76, stats: { receptions: 58, receivingYards: 685, receivingTDs: 6, targets: 82 } },
];

// Sample Fantasy Teams
export const sampleFantasyTeams: FantasyTeam[] = [
  {
    id: 't1',
    name: 'Gridiron Legends',
    owner: 'User1',
    roster: [samplePlayers[0], samplePlayers[4], samplePlayers[5], samplePlayers[9], samplePlayers[10], samplePlayers[14]],
    record: { wins: 6, losses: 3, ties: 0 },
    totalPoints: 1085.5,
    skillRating: 0,
  },
  {
    id: 't2',
    name: 'Touchdown Titans',
    owner: 'User2',
    roster: [samplePlayers[1], samplePlayers[6], samplePlayers[7], samplePlayers[11], samplePlayers[12], samplePlayers[15]],
    record: { wins: 5, losses: 4, ties: 0 },
    totalPoints: 995.2,
    skillRating: 0,
  },
];

// Sample schedule (Week 10-18 for example)
export const sampleSchedule: Game[] = [
  // Week 10
  { id: 'g1', week: 10, homeTeam: 'KC', awayTeam: 'BUF', played: false },
  { id: 'g2', week: 10, homeTeam: 'SF', awayTeam: 'DET', played: false },
  { id: 'g3', week: 10, homeTeam: 'BAL', awayTeam: 'CIN', played: false },
  { id: 'g4', week: 10, homeTeam: 'PHI', awayTeam: 'DAL', played: false },
  // Week 11
  { id: 'g5', week: 11, homeTeam: 'DET', awayTeam: 'GB', played: false },
  { id: 'g6', week: 11, homeTeam: 'BUF', awayTeam: 'MIA', played: false },
  { id: 'g7', week: 11, homeTeam: 'HOU', awayTeam: 'JAX', played: false },
  { id: 'g8', week: 11, homeTeam: 'SEA', awayTeam: 'LAR', played: false },
  // More weeks would be added here...
];
