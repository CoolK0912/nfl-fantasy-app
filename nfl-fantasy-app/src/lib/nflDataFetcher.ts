import { NFLTeam, Game, Player } from '@/types';

/**
 * Fetch live NFL data from ESPN API
 */
export async function fetchLiveNFLStandings(): Promise<NFLTeam[]> {
  try {
    const response = await fetch('https://site.api.espn.com/apis/v2/sports/football/nfl/standings', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch NFL standings');
    }

    const data = await response.json();

    return parseESPNStandings(data);
  } catch (error) {
    console.error('Error fetching live NFL data:', error);
    // Fallback to sample data if API fails
    return [];
  }
}

/**
 * Parse ESPN API response into our NFLTeam format
 */
function parseESPNStandings(data: any): NFLTeam[] {
  const teams: NFLTeam[] = [];

  try {
    // ESPN groups teams by division
    if (data.children) {
      data.children.forEach((conference: any) => {
        conference.standings?.entries?.forEach((entry: any) => {
          const team = entry.team;
          const stats = entry.stats;

          // Get record stats
          const wins = stats?.find((s: any) => s.name === 'wins')?.value || 0;
          const losses = stats?.find((s: any) => s.name === 'losses')?.value || 0;
          const ties = stats?.find((s: any) => s.name === 'ties')?.value || 0;
          const pointsFor = stats?.find((s: any) => s.name === 'pointsFor')?.value || 0;
          const pointsAgainst = stats?.find((s: any) => s.name === 'pointsAgainst')?.value || 0;

          // Calculate strength based on win percentage and point differential
          const winPct = wins / (wins + losses + ties || 1);
          const pointDiff = pointsFor - pointsAgainst;
          const strength = Math.round((winPct * 50) + ((pointDiff / 100) * 50));

          teams.push({
            id: team.id,
            name: team.displayName || team.name,
            abbreviation: team.abbreviation,
            division: getDivision(team.abbreviation),
            record: { wins, losses, ties },
            pointsFor,
            pointsAgainst,
            strength: Math.max(50, Math.min(100, strength))
          });
        });
      });
    }
  } catch (error) {
    console.error('Error parsing ESPN standings:', error);
  }

  return teams;
}

/**
 * Get division for a team abbreviation
 */
function getDivision(abbr: string): NFLTeam['division'] {
  const divisions: Record<string, NFLTeam['division']> = {
    'BUF': 'AFC East', 'MIA': 'AFC East', 'NYJ': 'AFC East', 'NE': 'AFC East',
    'BAL': 'AFC North', 'PIT': 'AFC North', 'CLE': 'AFC North', 'CIN': 'AFC North',
    'HOU': 'AFC South', 'JAX': 'AFC South', 'IND': 'AFC South', 'TEN': 'AFC South',
    'KC': 'AFC West', 'LAC': 'AFC West', 'DEN': 'AFC West', 'LV': 'AFC West',
    'PHI': 'NFC East', 'DAL': 'NFC East', 'WAS': 'NFC East', 'NYG': 'NFC East',
    'DET': 'NFC North', 'MIN': 'NFC North', 'GB': 'NFC North', 'CHI': 'NFC North',
    'TB': 'NFC South', 'ATL': 'NFC South', 'NO': 'NFC South', 'CAR': 'NFC South',
    'SF': 'NFC West', 'SEA': 'NFC West', 'LAR': 'NFC West', 'ARI': 'NFC West',
  };

  return divisions[abbr] || 'NFC East';
}

/**
 * Fetch current week's NFL schedule
 */
export async function fetchCurrentWeekGames(): Promise<{ games: Game[]; currentWeek: number }> {
  try {
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard', {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch NFL games');
    }

    const data = await response.json();
    const currentWeek = data.week?.number || 10;

    const games: Game[] = data.events?.map((event: any) => {
      const competition = event.competitions[0];
      const homeTeam = competition.competitors.find((c: any) => c.homeAway === 'home');
      const awayTeam = competition.competitors.find((c: any) => c.homeAway === 'away');

      return {
        id: event.id,
        week: currentWeek,
        homeTeam: homeTeam?.team?.abbreviation || '',
        awayTeam: awayTeam?.team?.abbreviation || '',
        homeScore: parseInt(homeTeam?.score) || undefined,
        awayScore: parseInt(awayTeam?.score) || undefined,
        played: competition.status?.type?.completed || false,
      };
    }) || [];

    return { games, currentWeek };
  } catch (error) {
    console.error('Error fetching NFL games:', error);
    return { games: [], currentWeek: 11 };
  }
}

/**
 * Fetch top fantasy players (from ESPN Fantasy API)
 */
export async function fetchTopFantasyPlayers(): Promise<Player[]> {
  try {
    // ESPN Fantasy API endpoint for top players
    const response = await fetch('https://fantasy.espn.com/apis/v3/games/ffl/seasons/2025/segments/0/leaguedefaults/1?view=kona_player_info', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch fantasy players');
    }

    const data = await response.json();

    return parseFantasyPlayers(data);
  } catch (error) {
    console.error('Error fetching fantasy players:', error);
    return [];
  }
}

/**
 * Parse ESPN Fantasy API response
 */
function parseFantasyPlayers(data: any): Player[] {
  const players: Player[] = [];

  try {
    if (data.players) {
      data.players.slice(0, 50).forEach((playerData: any) => {
        const player = playerData.player;
        const stats = player.stats;

        // Map ESPN position IDs to our positions
        const positionMap: Record<number, Player['position']> = {
          1: 'QB', 2: 'RB', 3: 'WR', 4: 'TE', 5: 'K', 16: 'DEF'
        };

        const position = positionMap[player.defaultPositionId] || 'RB';

        players.push({
          id: player.id.toString(),
          name: player.fullName,
          position,
          team: player.proTeamAbbreviation || 'FA',
          fantasyPoints: stats?.[0]?.appliedTotal || 0,
          projectedPoints: stats?.[1]?.appliedTotal || 0,
          value: calculatePlayerValue(stats?.[0]?.appliedTotal || 0, position),
          stats: {}
        });
      });
    }
  } catch (error) {
    console.error('Error parsing fantasy players:', error);
  }

  return players;
}

/**
 * Calculate player value for trades
 */
function calculatePlayerValue(points: number, position: Player['position']): number {
  const positionMultiplier: Record<Player['position'], number> = {
    QB: 1.0,
    RB: 1.3,
    WR: 1.1,
    TE: 1.2,
    K: 0.5,
    DEF: 0.6
  };

  return Math.round(points * (positionMultiplier[position] || 1.0));
}

/**
 * Check if we should use live data
 */
export function shouldUseLiveData(): boolean {
  return process.env.NEXT_PUBLIC_USE_LIVE_DATA === 'true';
}
