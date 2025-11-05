import { NextResponse } from 'next/server';
import { generatePlayoffBracket, projectDivisionStandings } from '@/lib/playoffSimulation';
import { simulateSeason } from '@/lib/gamePrediction';
import { nflTeams, sampleSchedule } from '@/lib/sampleData';
import { fetchLiveNFLStandings, fetchCurrentWeekGames, shouldUseLiveData } from '@/lib/nflDataFetcher';

export async function GET() {
  try {
    // Get real data if available, otherwise use sample data
    let teams = nflTeams;
    let currentWeek = 11;
    let schedule = sampleSchedule;

    if (shouldUseLiveData()) {
      const liveTeams = await fetchLiveNFLStandings();
      const { games, currentWeek: week } = await fetchCurrentWeekGames();

      if (liveTeams.length > 0) {
        teams = liveTeams;
        currentWeek = week;
      }
      if (games.length > 0) {
        schedule = [...games, ...sampleSchedule];
      }
    }

    // Simulate season outcomes
    const predictions = schedule.filter(g => g.week >= currentWeek && !g.played);
    const simulatedRecords = simulateSeason(teams, predictions, 1000);

    // Project final standings
    const standings = projectDivisionStandings(teams, simulatedRecords);

    // Generate playoff bracket
    const updatedTeams = teams.map(team => {
      const projected = simulatedRecords.get(team.abbreviation);
      return projected ? { ...team, record: projected } : team;
    });

    const playoffBracket = generatePlayoffBracket(updatedTeams);
    const superBowlChampion = playoffBracket.superBowl.predictedWinner;

    return NextResponse.json({
      standings,
      playoffBracket,
      superBowlChampion,
    });
  } catch (error) {
    console.error('Playoff simulation error:', error);
    return NextResponse.json(
      { error: 'Failed to simulate playoffs' },
      { status: 500 }
    );
  }
}
