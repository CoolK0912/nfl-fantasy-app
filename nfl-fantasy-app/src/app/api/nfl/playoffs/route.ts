import { NextResponse } from 'next/server';
import { generatePlayoffBracket, projectDivisionStandings } from '@/lib/playoffSimulation';
import { simulateSeason } from '@/lib/gamePrediction';
import { nflTeams, sampleSchedule } from '@/lib/sampleData';

export async function GET() {
  try {
    // Simulate season outcomes
    const currentWeek = 10;
    const predictions = sampleSchedule.filter(g => g.week >= currentWeek && !g.played);
    const simulatedRecords = simulateSeason(nflTeams, predictions, 1000);

    // Project final standings
    const standings = projectDivisionStandings(nflTeams, simulatedRecords);

    // Generate playoff bracket
    const updatedTeams = nflTeams.map(team => {
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
