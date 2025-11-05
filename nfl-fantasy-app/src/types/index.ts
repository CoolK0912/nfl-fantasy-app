// Player types
export interface Player {
  id: string;
  name: string;
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF';
  team: string;
  fantasyPoints: number;
  projectedPoints: number;
  stats: PlayerStats;
  value: number; // Trade value rating
}

export interface PlayerStats {
  passingYards?: number;
  passingTDs?: number;
  interceptions?: number;
  rushingYards?: number;
  rushingTDs?: number;
  receptions?: number;
  receivingYards?: number;
  receivingTDs?: number;
  targets?: number;
}

// Fantasy Team types
export interface FantasyTeam {
  id: string;
  name: string;
  owner: string;
  roster: Player[];
  record: { wins: number; losses: number; ties: number };
  totalPoints: number;
  skillRating: number;
}

export interface TeamRating {
  overall: number;
  qbStrength: number;
  rbStrength: number;
  wrStrength: number;
  teStrength: number;
  depth: number;
  upside: number;
}

// Trade types
export interface TradeProposal {
  team1: string;
  team2: string;
  team1Gives: Player[];
  team2Gives: Player[];
}

export interface TradeAnalysis {
  team1Value: number;
  team2Value: number;
  winner: 'team1' | 'team2' | 'fair';
  differential: number;
  recommendation: string;
  impactOnTeam1: TeamRating;
  impactOnTeam2: TeamRating;
}

// NFL Game types
export interface NFLTeam {
  id: string;
  name: string;
  abbreviation: string;
  division: 'AFC East' | 'AFC North' | 'AFC South' | 'AFC West' |
            'NFC East' | 'NFC North' | 'NFC South' | 'NFC West';
  record: { wins: number; losses: number; ties: number };
  pointsFor: number;
  pointsAgainst: number;
  strength: number;
}

export interface Game {
  id: string;
  week: number;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  played: boolean;
  predictedHomeScore?: number;
  predictedAwayScore?: number;
  winProbability?: {
    home: number;
    away: number;
  };
}

export interface SeasonPrediction {
  standings: DivisionStandings;
  playoffBracket: PlayoffBracket;
  superBowlChampion: string;
}

export interface DivisionStandings {
  [division: string]: NFLTeam[];
}

export interface PlayoffBracket {
  wildCard: PlayoffGame[];
  divisional: PlayoffGame[];
  championship: PlayoffGame[];
  superBowl: PlayoffGame;
}

export interface PlayoffGame {
  id: string;
  round: 'Wild Card' | 'Divisional' | 'Championship' | 'Super Bowl';
  homeTeam: string;
  awayTeam: string;
  predictedWinner: string;
  homeScore?: number;
  awayScore?: number;
}
