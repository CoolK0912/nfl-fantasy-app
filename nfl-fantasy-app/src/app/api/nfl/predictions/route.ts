import { NextRequest, NextResponse } from 'next/server';
import { predictRemainingSeason } from '@/lib/gamePrediction';
import { nflTeams, sampleSchedule } from '@/lib/sampleData';
import { fetchLiveNFLStandings, fetchCurrentWeekGames, shouldUseLiveData } from '@/lib/nflDataFetcher';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    let currentWeek = parseInt(searchParams.get('week') || '11');

    // Get real data if available
    let teams = nflTeams;
    let schedule = sampleSchedule;

    if (shouldUseLiveData()) {
      const liveTeams = await fetchLiveNFLStandings();
      const { games, currentWeek: week } = await fetchCurrentWeekGames();

      if (liveTeams.length > 0) {
        teams = liveTeams;
      }
      if (games.length > 0) {
        currentWeek = week;
        schedule = [...games, ...sampleSchedule];
      }
    }

    const predictions = predictRemainingSeason(teams, schedule, currentWeek);

    return NextResponse.json({
      currentWeek,
      predictions,
      usingLiveData: shouldUseLiveData() && teams.length > 0,
    });
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to generate predictions' },
      { status: 500 }
    );
  }
}
